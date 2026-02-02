/**
 * =====================================================
 * Hong Museum - Navbar Loader Component
 * 弘美术馆 - 导航栏加载组件
 * =====================================================
 *
 * This TypeScript module dynamically loads and injects
 * the navbar component into HTML pages.
 *
 * Usage:
 * 1. Add <div id="navbar-container"></div> where you want the navbar
 * 2. Include the compiled JS: <script src="js/navbar-loader.js" type="module"></script>
 * 3. Initialize: NavbarLoader.init({ lang: 'en', currentPage: 'home' });
 */
interface NavbarConfig {
    lang: 'en' | 'cn';
    currentPage?: string;
    languageSwitchUrl?: string;
}
interface Exhibition {
    href: string;
    label: string;
    isOngoing?: boolean;
}
interface ResidencyProgram {
    href: string;
    label: string;
}
interface NavbarData {
    homeUrl: string;
    guideUrl: string;
    guideLabel: string;
    aboutUrl: string;
    aboutLabel: string;
    exhibitionsLabel: string;
    exhibitions: Exhibition[];
    residencyLabel: string;
    residencyPrograms: ResidencyProgram[];
    languageSwitchUrl: string;
    langActiveText: string;
    langInactiveText: string;
    logoAlt: string;
    ariaLabel: string;
}
/**
 * NavbarLoader class - handles loading and rendering the navbar
 */
declare class NavbarLoader {
    private config;
    private data;
    constructor(config: NavbarConfig);
    /**
     * Generate exhibition dropdown items HTML
     */
    private generateExhibitionItems;
    /**
     * Generate residency program dropdown items HTML
     */
    private generateResidencyItems;
    /**
     * Generate the complete navbar HTML
     */
    generateHTML(): string;
    /**
     * Render the navbar into the specified container
     */
    render(containerId?: string): void;
    /**
     * Initialize Webflow navigation functionality after navbar is loaded
     */
    private initWebflowNav;
    /**
     * Static method to easily initialize the navbar
     */
    static init(config: NavbarConfig): NavbarLoader;
}
declare function autoDetectAndInit(): void;
export { NavbarLoader, NavbarConfig, NavbarData, autoDetectAndInit };
//# sourceMappingURL=navbar-loader.d.ts.map