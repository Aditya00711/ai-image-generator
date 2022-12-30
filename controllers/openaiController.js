const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const generateimage = async (req, res) => {
	const { prompt, size } = req.body
	const imageSize =
		size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'
	try {
		const aiGeneratedImage = await openai.createImage({
			n: 1,
			prompt,
			size: imageSize
		})
		const imageURL = aiGeneratedImage.data.data[0].url
		res.status(200).json({
			imageURL,
			success: true,
			message: 'Image generated successfully.'
		})
	} catch (error) {
		if (error.response) {
			console.log(error.response.status)
			console.log(error.response.data)
		} else console.log(error.message)
		res.status(500).json({
			error,
			success: false,
			message: "We couldn't generate the requested image."
		})
	}
}

module.exports = {
	generateimage
}
