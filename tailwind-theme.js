tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#0F172A",
                "primary-container": "#1E293B",
                "on-primary": "#FFFFFF",
                secondary: "#1E40AF",
                "secondary-container": "#2563EB",
                "on-secondary": "#FFFFFF",
                accent: "#F97316",
                "accent-container": "#FB923C",
                "on-accent": "#FFFFFF",
                orange: "#F97316",
                gold: "#F97316", // alias gold to orange to support existing elements cleanly
                green: "#1E40AF", // alias green to secondary steel blue
                wine: "#0F172A",  // alias wine to primary navy
                background: "#F8FAFC",
                surface: "#FFFFFF",
                "surface-container-low": "#F1F5F9",
                "surface-container": "#E2E8F0",
                "on-surface": "#1F2937",
                "on-surface-variant": "#4B5563",
                "on-background": "#1F2937",
                outline: "#CBD5E1",
                "outline-variant": "#E2E8F0",
                error: "#EF4444",
                "on-error": "#FFFFFF",
                "dark-neutral": "#0B0F19"
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
