import Image from "next/image";

import BrandLogo from "@/assets/img/BrandLogo.png"

const Navbar: React.FC = () => {
    return (
        <nav className="flex items-center justify-between p-4">
            <div className="flex items-center">
                <Image src={BrandLogo.src} className="invert drop-shadow-md" alt="Brand Logo" height={64} width={64} />
                <h1 className="text-white text-xl ml-2">Flight Search Application</h1>
            </div>
        </nav>
    );
};

export default Navbar;
