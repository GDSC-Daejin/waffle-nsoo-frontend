import React from "react";
import {useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const SlideImg = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const ImgBtn = styled.button`
    flex: 1;
    width: 20px;
`;

const Img = styled.img`
    flex: 5;
    width: 1280px;
    height: 720px;
`

const ImageSlider = () => {
    const slideRef = useRef(null);
    const [currentImg, setCurrentImg] = useState(0);
    const ImgWidth = 1920;
    
    useEffect(() => {
        const slideRange = currentImg * ImgWidth;
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${slideRange}px)`;
    }, [currentImg]);

    const moveNext = () => {
        if (currentImg === 2) return (
            setCurrentImg(currentImg - 2)
        );
        setCurrentImg(currentImg + 1);
    };

    const movePre = () => {
        if (currentImg === 0) return(
            setCurrentImg(currentImg + 2)
        );
        setCurrentImg(currentImg - 1);
    };

    return (
        <>
            <ImageContainer>
                
                <SlideImg ref={slideRef}>
                <ImgBtn onClick={movePre}>prev</ImgBtn>
                    <Img src="img/test1.jpg" />
                    <Img src="img/test2.jpg" />
                    <Img src="img/test3.jpg" />
                    <ImgBtn onClick={moveNext}>next</ImgBtn>
                </SlideImg>
                
            </ImageContainer>
        </>
    );
};

export default ImageSlider;