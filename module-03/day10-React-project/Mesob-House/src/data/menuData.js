// At the very top of data/menuData.js
import DoroWatImg from '../Assets/FullMenu/DoroWat.png';
import KitfoImg from '../Assets/FullMenu/Kitfo.png';
import TibsImg from '../Assets/FullMenu/Tibs.png';
import ShiroImg from '../Assets/FullMenu/Shiro.png';
import BeyaynetImg from '../Assets/FullMenu/Beyaynet.png';
import AwazeTibsImg from '../Assets/FullMenu/AwazeTibs.png';
import GoredGoredTibsImg from '../Assets/FullMenu/GoredGoredTibs.png';
import TejImg from '../Assets/FullMenu/Tej.png';

// Import Icons
import { FaPepperHot } from 'react-icons/fa';
import { PiWine } from "react-icons/pi";
import { LuSalad } from "react-icons/lu";

export const menuItems = [
    {
        id: "special-doro-wat",
        name: "Special Doro Wat",
        amharic: "",
        description: "Slow-cooked tender chicken drumette simmered for 12 hours with caramelized red onions, aged berbere gravy, and whole spices.",
        price: 650,
        image: DoroWatImg,
        category: "Traditional Stews & Wat",
        tag: "HIGHLAND CLASSIC",
        spiceLevel: "Medium Hot",
        spiceIcons: [FaPepperHot, FaPepperHot],
        theme: "red",
    },
    {
        id: "prime-beef-kitfo",
        name: "Prime Beef Kitfo",
        amharic: "",
        description: "Minced lean beef tossed in fiery mitmita, kibbeh, and clarified butter, served with ayib.",
        price: 720,
        image: KitfoImg,
        category: "Tibs & Grills",
        tag: "CHEF'S HERITAGE",
        spiceLevel: "Spicy (Mitmita)",
        spiceIcons: [FaPepperHot, FaPepperHot],
        theme: "red",
    },
    {
        id: "siga-tibs",
        name: "Siga Tibs",
        amharic: "",
        description: "Tender prime beef cubes flash-sauteed with fresh rosemary, sweet onions, garlic cloves, and sliced mild jalapeño.",
        price: 620,
        image: TibsImg,
        category: "Tibs & Grills",
        tag: "PAN-SEARED",
        spiceLevel: "Mild / Savory",
        spiceIcons: [FaPepperHot, FaPepperHot],
        theme: "red",
    },
    {
        id: "clay-pot-shiro-bozena",
        name: "Clay-pot Shiro Bozena",
        amharic: "",
        description: "Silky spiced chickpea flour stew simmered slowly with diced dried beef bits and served bubbling hot in a clay pot.",
        price: 450,
        image: ShiroImg,
        category: "Traditional Stews & Wat",
        tag: "CLAY-POT",
        spiceLevel: "Medium",
        spiceIcons: [FaPepperHot],
        theme: "red",
    },
    {
        id: "full-vegan-beyaynetu",
        name: "Full Vegan Beyaynetu",
        amharic: "",
        description: "Grand rainbow tasting platter composed of Misir Wat, Kik Alicha, braised gomen, sweet potato with carrots, Atakilt Wat.",
        price: 480,
        image: BeyaynetImg,
        category: "Vegan & Vegetarian",
        tag: "100% VEGAN / TSOM",
        spiceLevel: "Varied Spices",
        spiceIcons: [LuSalad],
        theme: "green",
    },
    {
        id: "awaze-lamb-tibs",
        name: "Awaze Lamb Tibs",
        amharic: "",
        description: "Marinated grass-fed highland lamb cubes pan-seared with house-made fiery awaze pepper paste, garlic.",
        price: 680,
        image: AwazeTibsImg,
        category: "Tibs & Grills",
        tag: "AWAZE GLAZE",
        spiceLevel: "Hot Awaze",
        spiceIcons: [FaPepperHot, FaPepperHot, FaPepperHot],
        theme: "red",
    },
    {
        id: "gored-gored",
        name: "Gored Gored",
        amharic: "",
        description: "Succulent cubed raw tenderloin rolled in fiery mitmita chili blend and infused with melted herbal niter kibbeh.",
        price: 750,
        image: GoredGoredTibsImg,
        category: "Tibs & Grills",
        tag: "PURIST'S FAVORITE",
        spiceLevel: "Extra Hot",
        spiceIcons: [FaPepperHot, FaPepperHot, FaPepperHot],
        theme: "red",
    },
    {
        id: "house-tej",
        name: "House Tej (Carafe)",
        amharic: "",
        description: "Traditional golden mead naturally fermented for 21 days with pure highland wildflower honey and bitter gesho wood.",
        price: 350,
        image: TejImg,
        category: "Beverages & Tej",
        tag: "FERMENTED IN-HOUSE",
        spiceLevel: "Pure Honey",
        spiceIcons: [PiWine],
        theme: "yellow",
    }
];