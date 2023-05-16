//It can be deployed as Serverless Functions (also known as Lambda).
// req = HTTP incoming message, res = HTTP server response

export default function handler(req, res) {
    res.status(200).json({ text: 'Hello'});
}