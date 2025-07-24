document.addEventListener('DOMContentLoaded' , () => {

    let form = document.querySelector('.form')
    let input = document.querySelector('#inputPrompt')
    let submitBtn = document.querySelector('#submitBtn')
    let imgSection = document.querySelector('.img-section')

    form.addEventListener('submit' , async (ele) =>{
        ele.preventDefault()
        let promptText = input.value.trim()
        if(!promptText) return

        imgSection.textContent = "Loading..."
        
        const apiKey = "51465821-89eef19196d47a634a9678d4b"
        try{
        let random = Math.floor(Math.random() * 10 ) + 1
        let response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${promptText}&image_type=photo&per_page=6&page=${random}`)
        console.log(response)
        let data = await response.json()
        
        if(data.hits.length === 0){
            imgSection.textContent = "No images found. Try different word"
            return
        }
        
        imgSection.innerHTML = data.hits.map((img) => 
            `
            <div class="images">
                <a href="${img.largeImageURL}" target="_blank" >
                    <img src="${img.webformatURL}" alt="${img.tags}">
                </a>
            </div>
            `
        ).join("")
        
    } 
        catch(error){
            imgSection.innerHTML = "Error fetching images"
            console.error(error)
        }
    })
})