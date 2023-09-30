const apiKey = 'api_key=379ec0dfe7a7de79851cd8c750391777';
const baseUrl = 'https://api.themoviedb.org/3/'
const searchUrl = baseUrl + '/search/movie?' + apiKey + '&query=';
const imgUrl = 'https://image.tmdb.org/t/p/w500';

let movieId = localStorage.getItem('movieId');
// console.log(movieId);
const details = baseUrl + '/movie/' + movieId + '?' + apiKey;
const credits = baseUrl + '/movie/' + movieId + '/credits?' + apiKey;





const movieContainer = document.querySelector(".movieContainer");
movieContainer.classList.add('loadMessage')
const loadMessage = document.querySelector('.loadMessage');
loadMessage.innerHTML = "Please wait your selected movie is loading....⏳"

const getDetails = async (url) => {
    try {
        const resp = await fetch(url)
        const data = await resp.json();
        // console.log(data);
        // console.log(data.cast);
        showDetails(data)


    } catch (error) {
        movieContainer.innerHTML = "Sorry we have not any data available right now about this movie"
        console.log(error);
    }


}

getDetails(details);







function showDetails(movie) {
    movieContainer.innerHTML = '';
    movieContainer.classList.remove('loadMessage');
    const movieInner = document.createElement('div')
    movieInner.classList.add('movieInner');



    let htmlData = `      
            <div class="moviePoster">
                <img src="${imgUrl + movie.poster_path}" alt="">
            </div>
            <div class="movieContent">
                <div class="movieHead">
                <p class="movieTitle">${movie.title}</p>
                <p class="tagline">"${movie.tagline ? movie.tagline : 'Tagline'}"</p>
                    <div class="rateTime">
                        <p class="rating"><i class="fa-solid fa-star"></i>${Math.round(movie.vote_average * 10) / 10}</p>
                        <p class="releaseDate"><i class="fas fa-hourglass-half"></i>${Math.floor(movie.runtime / 60)}h${(movie.runtime % 60)}m</p>
                    </div>
                </div>
                <div class="movieGenres">
                  
                    <p class="genres">${movie.genres[0] ? movie.genres[0].name : ""}</p>
                    <p class="genres">${movie.genres[1] ? movie.genres[1].name : ""}</p>
                    <p class="genres" id="genresName">${movie.genres[2] ? movie.genres[2].name : ""}</p>
                    
                </div>
                <div class="movieOverview">
                    <h3>Overview</h3>
                    <p>${movie.overview}</p>
                </div>
                
                <div class="otherDetails">
                    <div class="release">
                        <h4>Status:</h4>
                        <p>${movie.status}</p>
                        
                        <h4>Release Date:</h4>
                        <p>${movie.release_date}</p>
                        <h4>Language:</h4>
                        <p>${movie.original_language}</p>
                    </div>
                    
                    <div class="budgetIncome release">
                        <h4>Budget($):</h4>
                        <p>${movie.budget ? movie.budget : "-"}</p>
                        
                        <h4>Revenue($):</h4>
                        <p>${movie.revenue ? movie.revenue : "-"}</p>
                    </div>
                    
                </div>
                
                
            </div>
        `

    movieInner.insertAdjacentHTML('afterbegin', htmlData);
    movieContainer.appendChild(movieInner);



}




//  gettings details of movie cast

const getCast = async (url) => {
    const resp = await fetch(url)
    const data = await resp.json();
    // console.log(data);
    // console.log(data.cast);
    castDetails(data.cast)
    crewDetails(data.crew)


}

getCast(credits)


function castDetails(movie) {

    const castDetail = document.querySelector('.castDetail');
    castDetail.innerHTML = ""
    movie.slice(0, 18).forEach(element => {


        const castBox = document.createElement('div');
        castBox.classList.add('castBox');

        let castBoxHtml = `
            <img class="${element.profile_path ? '' : 'imgNot'}" src="${element.profile_path ? imgUrl + element.profile_path : ''}" alt="${element.profile_path ? 'cast image' : 'Image not found'}">
            <h5>${element.original_name}</h5>
            <p>${element.character}</p>   
            `
        castBox.insertAdjacentHTML("afterbegin", castBoxHtml);
        castDetail.appendChild(castBox)



    });

    // if cast details not found
    if (movie.length === 0) {
        // console.log('No data');
        castDetail.innerHTML = 'No details found'
    }


}


