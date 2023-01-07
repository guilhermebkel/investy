import Database from "@/server/infra/database"

class Infra {
	private static started = false

	async setup (): Promise<void> {
		if (Infra.started) {
			return
		}

		await Database.start()

		Infra.started = true
	}
}

export default new Infra()
