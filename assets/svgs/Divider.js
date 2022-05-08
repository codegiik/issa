export default function Divider(props) {
    return (
        <svg
            width={201}
            height={6}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5.887.113 3 3 .113 5.387 2.5h190.226L198 .113 200.887 3 198 5.887 195.613 3.5H5.387L3 5.887Z"
            />
        </svg>
    );
}
