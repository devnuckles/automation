import ReactReadMoreReadLess from "react-read-more-read-less";

export function ReadMoreLess({ desc, className }) {
    return (
        <ReactReadMoreReadLess
            className={className}
            charLimit={500}
            readMoreStyle={{
                whiteSpace: "nowrap",
                textDecoration: "none",
            }}
            readMoreText={"Read more ▼"}
            readLessText={"Read less ▲"}
        >
            {desc}
        </ReactReadMoreReadLess>
    );
}
