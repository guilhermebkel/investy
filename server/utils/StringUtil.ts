import StringSimilarity from "string-similarity"

class StringUtil {
	areSimilar (firstString: string, secondString: string): boolean {
		const normalizedFirstString = firstString.toLowerCase()
		const normalizedSecondString = secondString.toLowerCase()

		const similarity = StringSimilarity.compareTwoStrings(normalizedFirstString, normalizedSecondString)

		return similarity > 0.8
	}
}

export default new StringUtil()
