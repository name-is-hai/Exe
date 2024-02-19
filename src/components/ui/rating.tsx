import {
    CSSProperties,
    ReactNode,
    memo,
    useEffect,
    useState,
} from "react";

export function BsStar(props: any) {
    return (
        <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth={0}
            viewBox='0 0 16 16'
            height='1em'
            width='1em'
            {...props}
        >
            <path
                fillRule='evenodd'
                d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z'
                clipRule='evenodd'
            />
        </svg>
    );
}

export function BsStarFill(props: any) {
    return (
        <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth={0}
            viewBox='0 0 16 16'
            height='1em'
            width='1em'
            {...props}
        >
            <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
        </svg>
    );
}



export function BsStarHalf(props: any) {
    return (
        <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth={0}
            viewBox='0 0 16 16'
            height='1em'
            width='1em'
            {...props}
        >
            <path
                fillRule='evenodd'
                d='M5.354 5.119L7.538.792A.516.516 0 018 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0116 6.32a.55.55 0 01-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.519.519 0 01-.146.05c-.341.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 01-.171-.403.59.59 0 01.084-.302.513.513 0 01.37-.245l4.898-.696zM8 12.027c.08 0 .16.018.232.056l3.686 1.894-.694-3.957a.564.564 0 01.163-.505l2.906-2.77-4.052-.576a.525.525 0 01-.393-.288L8.002 2.223 8 2.226v9.8z'
                clipRule='evenodd'
            />
        </svg>
    );
}

export interface IRatingStarProps {
    value?: number;
    count?: number;
    size?: number | string;
    isEdit?: boolean;
    isHalf?: boolean;
    valueShow?: boolean;
    emptyIcon?: ReactNode;
    halfIcon?: ReactNode;
    filledIcon?: ReactNode;
    activeColor?: string;
    inactiveColor?: string;
    classNames?: string;
    style?: CSSProperties;
    onChange?: (nextValue: number) => void;
    activeColors?: string[];
}

function RatingStar(props: Readonly<IRatingStarProps>) {
    const {
        value = 0,
        count = 5,
        size = 14,
        isEdit = false,
        isHalf = false,
        valueShow = false,
        emptyIcon = <BsStar />,
        halfIcon = <BsStarHalf />,
        filledIcon = <BsStarFill />,
        activeColor = "#FED900",
        activeColors = [],
        inactiveColor = "#808080",
        onChange,
        style = {},
        classNames = "",
    } = props;

    const initialColor = activeColors[Math.round(value) - 1] || activeColor;

    const [currentValue, setCurrentValue] = useState<number>(value);
    const [color, setColor] = useState<string>(initialColor);

    const clickHandler = (nextValue: number, e: any) => {
        if (!isEdit) return;
        const value = nextValue;
        if (isHalf) {
            const xPos =
                (e.pageX - e.currentTarget?.getBoundingClientRect()?.left) /
                e.currentTarget?.offsetWidth;

            if (xPos <= 0.5) {
                nextValue -= 0.5;
            }
        }

        setCurrentValue(nextValue);

        // color set
        if (typeof onChange === "function") onChange(nextValue);
        const color = activeColors[value - 1]
            ? activeColors[value - 1]
            : activeColor;
        setColor(color);
    };

    useEffect(() => {
        // Update local state when the value prop changes
        setCurrentValue(value);

        // Set initial color or use the color from activeColors array
        const updatedColor = activeColors[Math.round(value) - 1] || activeColor;
        setColor(updatedColor);
    }, [value, activeColors, activeColor]);
    return (
        <div
            className={classNames}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                fontSize: typeof size === "number" ? `${size}px` : size,
                gap: 3,
            }}
        >
            {Array(count)
                .fill(1)
                .map((_item, index) => {
                    const roundedValue = Math.round(currentValue * 2) / 2;
                    const currentValueFloor = Math.floor(roundedValue);
                    const isActive = currentValueFloor >= index + 1;

                    // Check if the current value is a half value
                    const isHalfActive = roundedValue === index + 0.5;

                    // Determine the color and icon based on the current value and half value
                    const starColor = isHalfActive
                        ? color
                        : isActive
                            ? color
                            : inactiveColor;
                    const starIcon = isHalfActive
                        ? halfIcon
                        : isActive
                            ? filledIcon
                            : emptyIcon;

                    return (
                        <span
                            // onClick={(e) => clickHandler(index + 1, e)}
                            key={index}
                            style={{
                                color: starColor,
                                cursor: isEdit ? "pointer" : "default",
                            }}
                        >
                            {starIcon}
                        </span>
                    );
                })}
            <span style={{ color: inactiveColor }}>
                {!!currentValue && valueShow && currentValue.toFixed(1)}
            </span>
        </div>
    );
}

export default memo(RatingStar);