const form = document.querySelector('form')
const loadingElement = document.querySelector('.loader')
const backdrop = document.querySelector('.backdrop')
const img = document.querySelector('img')
const imgContainer = document.querySelector('.imageContainer')
const msgCard = document.querySelector('.msgCard')
const msgElement = document.querySelector('.msg')

form.addEventListener('submit', (event) => {
	event.preventDefault()
	const formData = new FormData(form)
	const prompt = formData.get('imageText')
	const size = formData.get('size')
	if (!prompt || !size) {
		msgCard.style.display = 'block'
		msgElement.textContent = 'Please enter valid prompt and size'
	} else {
		msgCard.style.display = 'none'
		msgElement.textContent = ''
		fetchImage(prompt, size)
	}
})

const fetchImage = async (prompt, size) => {
	try {
		loadingElement.style.display = 'block'
		backdrop.style.display = 'block'
		imgContainer.style.display = 'none'
		msgCard.style.display = 'none'
		const res = await fetch(`http://localhost:7000/openai/generateimage`, {
			method: 'POST',
			body: JSON.stringify({ prompt, size }),
			headers: {
				'content-type': 'application/json'
			}
		})
		const data = await res.json()
		if (data.success) {
			loadingElement.style.display = 'none'
			backdrop.style.display = 'none'
			imgContainer.style.display = 'block'
			img.src = data.imageURL
		}
	} catch (error) {
		loadingElement.style.display = 'none'
		backdrop.style.display = 'none'
		imgContainer.style.display = 'none'
		msgCard.style.display = 'block'
		msgElement.textContent = 'Something went wrong. Please try again later.'
		console.error(error)
	}
}
