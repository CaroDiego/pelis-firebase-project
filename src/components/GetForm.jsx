function GetForm() {
  return (
    <form>
      <fieldset>
        <label htmlFor="name-film">Film Name: </label>
        <input type="text" id="name-film" />
      </fieldset>
          <fieldset>
              <label htmlFor="poster-film">Poster: </label>
              <input type="text" id="poster-film"></input>
      </fieldset>
      <fieldset>
        <label htmlFor="year-film">Year: </label>
        <input type="text" id="year-film" />
      </fieldset>
      <fieldset>
        <label htmlFor="genre-film">Genre: </label>
        <input type="text" id="genre-film" />
      </fieldset>
      <fieldset>
        <label htmlFor="director-film">Director: </label>
        <input type="text" id="director-film" />
      </fieldset>
      <button>Submit</button>
    </form>
  );
}

export default GetForm;
