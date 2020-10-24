import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import MoviesTable from "./MoviesTable";
import Genres from "./Genres";
import Pagination from "./common/Pagination";
import SearchBox from "./common/SearchBox";

import { paginate, sort } from "../utilities/utils";
import { getGenres } from "../services/GenreService";
import { getMovies, deleteMovie } from "../services/MovieService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  handleDelete = async (movie) => {
    const orignialMovies = this.state.movies;

    const movies = orignialMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 403)
          toast.error("You do not have permission to delete a movie");
        if (ex.response.status === 404)
          toast.error("This movies has already been deleted");
      }

      this.setState({ movies: orignialMovies });
    }
  };

  handleLike = (movie) => {
    const movies = this.state.movies.map((m) => {
      if (m._id === movie._id) {
        m.liked = !m.liked;
      }
      return m;
    });

    this.setState({ movies });
  };

  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  handleGenreChange = (selectedGenre) => {
    this.setState({
      selectedGenre,
      currentPage: 1,
      searchQuery: "",
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearchChange = (searchQuery) => {
    this.setState({
      searchQuery,
      currentPage: 1,
      selectedGenre: null,
    });
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres,
    });
  }

  getPagedData = () => {
    const {
      movies: allMovies,
      sortColumn,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
    } = this.state;

    const filteredMovies = selectedGenre
      ? allMovies.filter((m) => m.genre.name === selectedGenre)
      : allMovies;

    const searchedMovies = searchQuery
      ? filteredMovies.filter(
          (m) => m.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
        )
      : filteredMovies;

    const orderedMovies = sort(
      searchedMovies,
      sortColumn.path,
      sortColumn.order
    );

    const paginatedMovies = paginate(orderedMovies, currentPage, pageSize);

    return {
      paginatedMovies: paginatedMovies,
      totalMovies: searchedMovies.length,
    };
  };

  render() {
    const {
      movies: allMovies,
      genres,
      sortColumn,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
    } = this.state;

    const { user } = this.props;

    const { paginatedMovies, totalMovies } = this.getPagedData();

    const renderTableTitle = () => {
      if (allMovies.length === 0) return "There are no movies in the database.";
      else return `Showing ${totalMovies} movies in the database`;
    };

    return (
      <>
        <div className="row">
          <div className="col-2">
            <Genres
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreChange={this.handleGenreChange}
            />
          </div>
          <div className="col">
            {user && (
              <Link to="/movies/new" className="btn btn-primary mb-2">
                New Movie
              </Link>
            )}
            <p>{renderTableTitle()}</p>
            <SearchBox
              name="search"
              searchQuery={searchQuery}
              onChange={this.handleSearchChange}
              placeHolder="Search..."
            />
            <MoviesTable
              movies={paginatedMovies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              totalMovies={totalMovies}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
