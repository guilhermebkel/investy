class LogService {
	error (error: Error): void {
		console.log(error)
	}
}

export default new LogService()
