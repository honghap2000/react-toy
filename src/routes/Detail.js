import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});

    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();

      console.log(json.data.movie);
      setMovie(json.data.movie);
    };
    
    useEffect(() => {
        getMovie();
        setLoading(false);
    }, []);

    console.log(movie);

    return (
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <h2>{movie.title}</h2>
            <ul>
              {/* {movie.genres.map((g, index) => (
                <li key={index}>{g}</li>
              ))} */}
            </ul>
          </div>
        )}
      </div>
    );
}

export default Detail;