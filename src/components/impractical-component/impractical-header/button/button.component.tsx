import { useState, useLayoutEffect, useRef } from 'react';
import { Button } from "@material-ui/core";

import './button.style.css';

interface EnteredOption {
    hasEntered: boolean;
    x: number;
    y: number;
};

export const ImpracticalHeaderButton = (props: any) => {
    const parentRef = useRef() as any;
    const targetRef = useRef() as any;
    const [entered, setEntered] = useState({} as EnteredOption);
    const [dimensions, setDimensions] = useState({ width:0, height: 0 } as any);

    useLayoutEffect(() => {
        if (parentRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, []);

    const moveOption = (event: any, entered: boolean) => {
        setEntered({
            hasEntered: entered,
            x: event.clientX,
            y: event.clientY
        })
    }

    const getXPosition = () => {
        return (parentRef.current.offsetLeft - entered.x) + dimensions.width/2;
    }

    const getYPosition = () => {
        return (parentRef.current.offsetTop - entered.y) + dimensions.height/2;
    }

    return (
        <div
            className='impactical-button-parent'
            ref={parentRef}
            onMouseMove={(event: any) => moveOption(event, true)} 
            onMouseLeave={(event: any) => moveOption(event, false)} 
            style={{
                width: dimensions.width,
                height: dimensions.height
            }}
        >
            <Button
                className='impractical-button'
                ref={targetRef} 
                style={
                    entered.hasEntered ? 
                    ({
                        position: 'absolute',
                        transform: `translate(${getXPosition()}px, ${getYPosition()}px)`,
                        transition: '100ms'
                    }) :
                    ({
                        position: 'absolute',
                        transform: 'translate(0px, 0px)',
                        transition: 'ease-in 200ms',
                    }) 
                }
            >
                {props.name}
            </Button>
        </div>
    )
}