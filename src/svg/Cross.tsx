import * as React from "react"
const SvgComponent = (props: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        viewBox="0 0 13.229 13.229"
        {...props}
    >
        <path
            d="M0 283.77c2.346 2.347 4.275 4.275 5.86 5.857 7.322 7.31 7.322 7.278 7.322 7.278"
            style={{
                fill: "none",
                stroke: "#000",
                strokeWidth: 0.5,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                strokeMiterlimit: 4,
                strokeDasharray: "none",
            }}
            transform="translate(0 -283.77)"
        />
        <path
            d="M13.182 283.865C0 297-.048 297-.048 297"
            style={{
                fill: "none",
                stroke: "#000",
                strokeWidth: 0.5,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                strokeMiterlimit: 4,
                strokeDasharray: "none",
            }}
            transform="translate(0 -283.77)"
        />
    </svg>
)
export default SvgComponent
