import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { movieDetails, clearMovieDetails } from "../store/actions";

import Header from "./global/header";
import Footer from "./global/footer";
import Chatbot from "./global/chatbot";
import BookingForm from "./movie/booking-form";
// import { RequestLoader, RequestSucceeded } from "./global/form-loader";

import YouTube from "react-youtube";

import { Facebook as ContentLoader } from "react-content-loader";

import { FaCaretRight } from "react-icons/fa";

import Typography from "@mui/material/Typography";

const youtubeOpts = {
    height: "300",
    width: "500",
    playerVars: {
        autoplay: 0,
        origin: "http:localhost:3000",
        enablejsapi: "1",
    },
};

const Movie = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state;

    const movie = useSelector((state) => state.movies.movieDetails);
    const movieRequest = useSelector((state) => state.movies.movieRequest);

    useEffect(() => {
        document.title = movie
            ? `${movie.title} | Henry Golden Cinema`
            : "Movie | Henry Golden Cinema";
    }, [movie]);

    useEffect(() => {
        if (locationState == null && params.title !== "...") {
            navigate("/error", {
                state: {
                    movieTitle: params.title,
                    elementScroll: "error-scroll",
                },
            });
        } else if (params.title !== "...") {
            dispatch(movieDetails(locationState.movie.id));
        }

        return dispatch(clearMovieDetails());
    }, [dispatch, navigate, locationState, params]);

    return (
        <section className="movie-route">
            <Header />
            <Chatbot />

            {!movieRequest ? (
                movie ? (
                    <div className="movie-route-wrapper  content-fit">
                        <div className="heading-wrapper display-flex flex-row">
                            <FaCaretRight className="heading-icon" />
                            <Typography
                                className="heading-title"
                                variant="h4"
                                component="div"
                            >
                                {movie.title}
                            </Typography>
                        </div>
                        <div className="movie-wrapper">
                            <div className="movie-details">
                                <img
                                    className="movie-img"
                                    src={movie.imgURL}
                                    alt="movie-img"
                                />
                                <div className="movie-data">
                                    <Typography
                                        className="movie-title"
                                        variant="h4"
                                        component="div"
                                    >
                                        {movie.title}
                                    </Typography>

                                    <div className="details-wrapper">
                                        <Typography
                                            className="movie-attrib"
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            Rate
                                        </Typography>
                                        <Typography
                                            className="movie-info"
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            {movie.rate}/10
                                        </Typography>
                                    </div>
                                    <div className="details-wrapper">
                                        <Typography
                                            className="movie-attrib"
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            Duration
                                        </Typography>
                                        <Typography
                                            className="movie-info"
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            {movie.duration} min
                                        </Typography>
                                    </div>
                                    <div className="details-wrapper">
                                        <Typography
                                            className="movie-attrib"
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            Cast
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            {movie.actors.map((actor) => (
                                                <Typography
                                                    className="movie-info"
                                                    variant="subtitle1"
                                                    gutterBottom
                                                    component="div"
                                                    key={actor}
                                                >
                                                    {actor}
                                                </Typography>
                                            ))}
                                        </Typography>
                                    </div>
                                    <div className="details-wrapper">
                                        <Typography
                                            className="movie-attrib"
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            Writers
                                        </Typography>
                                        <Typography
                                            className="movie-info"
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            {movie.writers.map((Writer) => (
                                                <Typography
                                                    variant="subtitle1"
                                                    gutterBottom
                                                    component="div"
                                                    key={Writer}
                                                >
                                                    {Writer}
                                                </Typography>
                                            ))}
                                        </Typography>
                                    </div>
                                    <div className="details-wrapper">
                                        <Typography
                                            className="movie-attrib"
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            Director
                                        </Typography>
                                        <Typography
                                            className="movie-info"
                                            variant="subtitle1"
                                            gutterBottom
                                            component="div"
                                        >
                                            {movie.director}
                                        </Typography>
                                    </div>
                                    <Typography
                                        className="movie-description"
                                        variant="body1"
                                        gutterBottom
                                        component="div"
                                    >
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            Movie Description
                                        </Typography>
                                        {movie.description}
                                    </Typography>
                                </div>
                            </div>
                            <div className="movie-booking">
                                <BookingForm />
                                <div className="movie-trailer">
                                    <Typography
                                        className="movie-attrib"
                                        variant="h5"
                                        gutterBottom
                                        component="div"
                                    >
                                        <b>Watch Trailer</b>
                                    </Typography>
                                    <YouTube
                                        videoId={movie.ytTrailerId}
                                        opts={youtubeOpts}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="movie-route-wrapper  content-fit">
                        <div className="heading-wrapper display-flex flex-row">
                            <FaCaretRight className="heading-icon" />
                            <Typography
                                className="heading-title"
                                variant="h4"
                                component="div"
                            >
                                Move Title
                            </Typography>
                        </div>
                        <div className="empty-details">
                            <Typography
                                variant="h4"
                                component="div"
                                gutterBottom
                            >
                                No Movie to show.
                            </Typography>
                            <button
                                className="btn-1"
                                onClick={() =>
                                    navigate("/movies", {
                                        state: {
                                            elementScroll: "movies-scroll",
                                        },
                                    })
                                }
                            >
                                Movies
                            </button>
                        </div>
                    </div>
                )
            ) : (
                <div className="movie-route-wrapper  content-fit">
                    <div className="heading-wrapper display-flex flex-row">
                        <FaCaretRight className="heading-icon" />
                        <Typography
                            className="heading-title"
                            variant="h4"
                            component="div"
                        >
                            Move Title
                        </Typography>
                    </div>
                    <div className="content-loader">
                        <ContentLoader speed={2} foregroundColor={"#999999"} />
                    </div>
                </div>
            )}
            <Footer />
        </section>
    );
};

export default Movie;
