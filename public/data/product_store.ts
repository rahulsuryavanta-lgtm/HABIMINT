export const journal_Id = 7;
export const version_Id = 8;

export interface JournalsSectionProducts_Int {
    product_id: number;
    title: string;
    subtitle: string;
    description: string;
    price: string;
    numPrice: number;
    originalPrice: string;
    originalNumPrice: number;
    savings: string;
    discount: number;
    image: string;
    link: string;
    delay: number;
    badgeLeft: {
        text: string;
        className: string;
    };
    badgeRight: {
        text: string;
        className: string;
    };
    cart_id: number;
    cart_qty: number;
    shopBadge: string;
    shopBadgeColor: string;
    isNew: boolean;
    tagline: string;
    slug: string;
}

export const JournalsSectionProducts = [
    {
        product_id: journal_Id,
        title: "Fall Forward",
        subtitle: "Your 4-Month Transformation Journey",
        description: "316 pages of structured daily reflection, habit tracking, monthly planning and 4 exclusive artworks by Persian & Indian artists.",
        price: "₹749",
        numPrice: 749,
        originalPrice: "₹1,299",
        originalNumPrice: 1299,
        savings: "Save ₹550",
        discount: 550,
        image: "/images/fall-forward-hero.jpg",
        link: "/products/fall-forward",
        delay: 0.2,
        badgeLeft: {
            text: "BESTSELLER",
            className: "bg-habimint-primary text-white",
        },
        badgeRight: {
            text: "42% OFF",
            className: "bg-habimint-accent text-white",
        },
        cart_id: 0,
        cart_qty: 0,
        shopBadge: "BESTSELLER",
        shopBadgeColor: "bg-habimint-primary",
        isNew: false,
        tagline: 'Your 4-Month Transformation Journey',
        slug: 'fall-forward',
    },
    {
        product_id: version_Id,
        title: "Version 2.0",
        subtitle: "Your 21-Day Guide to Becoming Unstoppable",
        description: "21 days of intense habit tracking across 6 life dimensions — Spiritual, Mental, Physical, Economic, Emotional, General.",
        price: "₹249",
        numPrice: 249,
        originalPrice: "₹599",
        originalNumPrice: 599,
        savings: "Save ₹350",
        discount: 350,
        image: "/images/version2-hero.jpg",
        link: "/products/version-2-0",
        delay: 0.4,
        badgeLeft: {
            text: "NEW",
            className: "bg-habimint-accent text-white",
        },
        badgeRight: {
            text: "58% OFF",
            className: "bg-habimint-primary text-white",
        },
        cart_id: 0,
        cart_qty: 0,
        shopBadge: "NEW",
        shopBadgeColor: "bg-habimint-accent",
        isNew: true,
        tagline: 'Your 21-Day Guide to Becoming Unstoppable',
        slug: 'version-2-0',
    },
];


export const DetailPage_Products = {
    'fall-forward': {
        id: journal_Id,
        slug: 'fall-forward',
        name: 'Fall Forward',
        tagline: 'Your 4-Month Transformation Journey',
        price: 749,
        originalPrice: 1299,
        badge: 'BESTSELLER',
        badgeColor: 'bg-habimint-primary',
        mainImage: '/images/fall-forward-hero.jpg',
        gallery: [
            '/images/fall-forward-hero.jpg',
            '/images/fall-forward-cover.jpg',
            '/images/fall-forward-open.jpg',
            '/images/fall-forward-inside.jpg',
            '/images/fall-forward-desk.jpg',
        ],
        description: "Fall Forward is not just a journal — it's a complete personal growth system. 316 pages meticulously designed to guide you through a 4-month transformation journey. Every page was crafted with intention — from your morning affirmation to your evening reflection. This journal doesn't just give you blank pages, it guides you with thoughtful prompts, habit trackers, and beautiful artwork that inspires growth at every turn.",
        features: [
            '316 premium pages',
            'Morning & evening daily pages',
            'Weekly reflection spreads',
            'Monthly planning & budget tracking',
            'Vision & goal setting pages',
            '4 exclusive artworks (Persian & Indian artists)',
            'Letter to Future Self (tearable page)',
            '157gsm cover, 80gsm inner pages',
            'Matt laminated case-bound cover',
            'Size: 22.5 × 16.5 × 2.5 cm',
        ],
        specifications: {
            'Pages': '316 pages',
            'Duration': '4 months (120 days)',
            'Cover': '157gsm matt laminated case-bound',
            'Inner Pages': '80gsm premium quality',
            'Binding': 'Case-bound (hardcover)',
            'Dimensions': '22.5 × 16.5 × 2.5 cm',
            'Weight': '650g',
            'Color': 'Deep Black',
            'Special Features': 'Letter to Future Self (tearable), 4 exclusive artworks',
        },
        insidePages: [
            { image: '/images/fall-forward-art-1.jpg', title: 'Before the Surface', subtitle: 'Month 1 Artwork' },
            { image: '/images/fall-forward-art-2.jpg', title: 'All That I Am', subtitle: 'Month 3 Artwork — By Vignesh' },
            { image: '/images/fall-forward-inside.jpg', title: 'Daily Pages', subtitle: 'Morning + Evening Reflection' },
            { image: '/images/fall-forward-open.jpg', title: 'Monthly Planning', subtitle: 'Budget + Goals Tracker' },
        ],
        rating: 4.8,
        reviewCount: 127,
        cart_id: 0,
        cart_qty: 0,
    },
    'version-2-0': {
        id: version_Id,
        slug: 'version-2.0',
        name: 'Version 2.0',
        tagline: 'Your 21-Day Guide to Becoming Unstoppable',
        price: 249,
        originalPrice: 599,
        badge: 'NEW',
        badgeColor: 'bg-habimint-accent',
        mainImage: '/images/version2-hero.jpg',
        gallery: [
            '/images/version2-hero.jpg',
            '/images/version2-cover.jpg',
            '/images/version2-open.jpg',
            '/images/version2-flat.jpg',
        ],
        description: "Version 2.0 is your 21-day intensive habit transformation guide. Track 6 dimensions of growth every single day — Spiritual, Mental, Physical, Economic, Emotional, General. This isn't your typical habit tracker. It's a complete system designed to help you become the best version of yourself in just 3 weeks. With daily scoring, bad habit resistance tracking, and powerful quotes, Version 2.0 pushes you to take massive action.",
        features: [
            '21-day structured program',
            '6 life dimensions tracked daily',
            'Daily scoring system (±6)',
            'Bad habit resistance tracker',
            'Weekly reflection pages',
            '21 powerful daily quotes',
            'Spiral bound for flat writing',
            'Premium quality paper',
        ],
        specifications: {
            'Duration': '21 days',
            'Dimensions Tracked': '6 (Spiritual, Mental, Physical, Economic, Emotional, General)',
            'Binding': 'Spiral bound',
            'Paper Quality': 'Premium 80gsm',
            'Size': '21 × 15 cm',
            'Weight': '200g',
            'Color': 'Deep Forest Green',
            'Special Features': 'Daily quotes, Bad habit tracker, Scoring system',
        },
        insidePages: [
            { image: '/images/version2-open.jpg', title: 'Daily Tracking Page', subtitle: '6 Dimensions Scorecard' },
            { image: '/images/version2-flat.jpg', title: 'Spiral Bound Design', subtitle: 'Lays flat for easy writing' },
        ],
        rating: 4.9,
        reviewCount: 83,
        cart_id: 0,
        cart_qty: 0,
    },
};




export const DetailPage_Testimonials = [
    {
        name: 'Tanmay Kumar Sani',
        role: 'Photographer',
        rating: 5,
        text: "Fall Forward completely changed how I start my mornings. The daily reflection pages pushed me to be more intentional about my goals. I have tried many journals — this one actually works.",
    },
    {
        name: 'Priya Sharma',
        role: 'Marketing Manager, Mumbai',
        rating: 5,
        text: "I have tried 6 different journals. Nothing comes close to Fall Forward. The artwork inside is stunning and the structure actually guides you — it does not just give you blank pages.",
    },
    {
        name: 'Arjun Mehta',
        role: 'Entrepreneur',
        rating: 5,
        text: 'Version 2.0 gave me the kick I needed. 21 days of tracking every dimension of my life made me realize where I was slacking. Game changer.',
    },
    {
        name: 'Neha Patel',
        role: 'Yoga Instructor',
        rating: 4,
        text: 'Beautiful design, thoughtful prompts, and high-quality paper. The habit tracking system is simple but effective. Highly recommend for anyone serious about growth.',
    },
    {
        name: 'Rohan Desai',
        role: 'Software Engineer',
        rating: 5,
        text: 'The best investment I made this year. Fall Forward helped me build consistency and track progress like never before. The monthly reflections are incredibly powerful.',
    },
];
