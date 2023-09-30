const apiKey = 'api_key=379ec0dfe7a7de79851cd8c750391777';
const baseUrl = 'https://api.themoviedb.org/3/'
const searchUrl = baseUrl + '/search/movie?' + apiKey + '&query=';
const imgUrl = 'https://image.tmdb.org/t/p/w500';

let tvId = localStorage.getItem('tvId');

// console.log(tvId);
const details = baseUrl + '/tv/' + tvId + '?' + apiKey;
const credits = baseUrl + '/tv/' + tvId + '/credits?' + apiKey;



const movieContainer = document.querySelector(".movieContainer");
movieContainer.classList.add('loadMessage')
const loadMessage = document.querySelector('.loadMessage');
loadMessage.innerHTML = "Please wait your selected tv show is loading....⏳"

const getDetails = async (url) => {
    try {
        const resp = await fetch(url)
        const data = await resp.json();
        // console.log(data);
        // console.log(data.cast);
        showDetails(data)


    } catch (error) {
        movieContainer.innerHTML = "Sorry we have not any data available right now about this tv show"
        console.log(error);
    }


}

getDetails(details);







function showDetails(tv) {
    movieContainer.innerHTML = '';
    movieContainer.classList.remove('loadMessage');
    const movieInner = document.createElement('div')
    movieInner.classList.add('movieInner');



    let htmlData = `      
            <div class="moviePoster">
                <img src="${imgUrl + tv.poster_path}" alt="">
            </div>
            <div class="movieContent">
                <div class="movieHead">
                <p class="movieTitle">${tv.title}</p>
                <p class="tagline">"${tv.tagline ? tv.tagline : 'Tagline'}"</p>
                    <div class="rateTime">
                        <p class="rating"><i class="fa-solid fa-star"></i>${Math.round(tv.vote_average*10)/10}</p>
                        <p class="releaseDate"><i class="fas fa-hourglass-half"></i>${Math.floor(tv.runtime / 60)}h${(tv.runtime % 60)}m</p>
                    </div>
                </div>
                <div class="movieGenres">
                  
                    <p class="genres">${tv.genres[0] ? tv.genres[0].name : ""}</p>
                    <p class="genres">${tv.genres[1] ? tv.genres[1].name : ""}</p>
                    <p class="genres" id="genresName">${tv.genres[2] ? tv.genres[2].name : ""}</p>
                    
                </div>
                <div class="movieOverview">
                    <h3>Overview</h3>
                    <p>${tv.overview}</p>
                </div>
                
                <div class="otherDetails">
                    <div class="release">
                        <h4>Status:</h4>
                        <p>${tv.status}</p>
                        
                        <h4>Release Date:</h4>
                        <p>${tv.release_date}</p>
                        <h4>Language:</h4>
                        <p>${tv.original_language}</p>
                    </div>
                    
                    <div class="budgetIncome release">
                        <h4>Budget($):</h4>
                        <p>${tv.budget ? tv.budget : "-"}</p>
                        
                        <h4>Revenue($):</h4>
                        <p>${tv.revenue ? tv.revenue : "-"}</p>
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

