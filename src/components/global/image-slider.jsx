import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { moviesList } from "../../store/actions";

import Slider from "react-slick";

const LoadingImgURL =
    "https://camo.githubusercontent.com/3bec5c0c93180a4bfaaabe7a2cdcefb6cada4bb47fa19f6e43cc9498ba79efe0/687474703a2f2f692e696d6775722e636f6d2f637873543772532e676966";

const Home = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movies);
    const loading = useSelector((state) => state.movies.moviesLoading);

    useEffect(() => {
        dispatch(moviesList());
    }, [dispatch]);

    var settings = {
        dots: false,
        arrows: false,
        draggable: false,
        infinite: true,
        focusOnSelect: true,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 2500,
        centerPadding: "-20px",
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    return (
        <div>
            {movies ? (
                <Slider className="slick-slider" {...settings}>
                    {movies.map((movie) => (
                        <div key={movie.id}>
                            <img
                                className="slider-img"
                                src={loading ? LoadingImgURL : movie.imgURL}
                                alt="slider-img"
                            />
                        </div>
                    ))}
                </Slider>
            ) : (
                <Slider className="slick-slider" {...settings}>
                    <div>
                        <img
                            className="slider-img"
                            src={LoadingImgURL}
                            alt="slider-img"
                        />
                    </div>
                    <div>
                        <img
                            className="slider-img"
                            src={LoadingImgURL}
                            alt="slider-img"
                        />
                    </div>
                    <div>
                        <img
                            className="slider-img"
                            src={LoadingImgURL}
                            alt="slider-img"
                        />
                    </div>
                    <div>
                        <img
                            className="slider-img"
                            src={LoadingImgURL}
                            alt="slider-img"
                        />
                    </div>
                    <div>
                        <img
                            className="slider-img"
                            src={LoadingImgURL}
                            alt="slider-img"
                        />
                    </div>
                    <div>
                        <img
                            className="slider-img"
                            src={LoadingImgURL}
                            alt="slider-img"
                        />
                    </div>
                </Slider>
            )}
        </div>
    );
};

export default Home;
