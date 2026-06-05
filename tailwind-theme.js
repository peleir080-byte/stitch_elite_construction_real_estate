tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#023c22",
                "primary-container": "#034f2d",
                "on-primary": "#FFFFFF",
                secondary: "#d4af37",
                "secondary-container": "#e0c266",
                "on-secondary": "#101820",
                "on-secondary-container": "#101820",
                tertiary: "#720501",
                "tertiary-container": "#8b0702",
                "on-tertiary": "#FFFFFF",
                wine: "#720501",
                gold: "#d4af37",
                green: "#023c22",
                background: "#f8faf8",
                surface: "#FFFFFF",
                "surface-container-low": "#faf9f6",
                "surface-container": "#e6ebe6",
                "on-surface": "#0a1c14",
                "on-surface-variant": "#435249",
                "on-background": "#0a1c14",
                outline: "#d2dbd2",
                "outline-variant": "#e6ebe6",
                error: "#720501",
                "on-error": "#FFFFFF",
                "dark-neutral": "#0c0f14"
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px"
            },
            spacing: {
                "margin-mobile": "16px",
                "margin-desktop": "64px",
                "section-gap": "96px",
                "container-max": "1280px",
                gutter: "24px"
            },
            fontFamily: {
                "display-lg": ["Montserrat", "sans-serif"],
                "display-lg-mobile": ["Montserrat", "sans-serif"],
                "headline-lg": ["Montserrat", "sans-serif"],
                "headline-lg-mobile": ["Montserrat", "sans-serif"],
                "headline-md": ["Montserrat", "sans-serif"],
                "body-lg": ["Inter", "sans-serif"],
                "body-md": ["Inter", "sans-serif"],
                "label-md": ["Montserrat", "sans-serif"],
                caption: ["Inter", "sans-serif"]
            },
            fontSize: {
                "display-lg": ["48px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
                "display-lg-mobile": ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
                "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
                "headline-lg-mobile": ["26px", { lineHeight: "1.3", fontWeight: "600" }],
                "headline-md": ["22px", { lineHeight: "1.35", fontWeight: "600" }],
                "body-lg": ["18px", { lineHeight: "1.65", fontWeight: "400" }],
                "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
                "label-md": ["13px", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "600" }],
                caption: ["12px", { lineHeight: "1.5", fontWeight: "400" }]
            }
        }
    }
};
