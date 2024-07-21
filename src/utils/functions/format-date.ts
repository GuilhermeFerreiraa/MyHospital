

class FormatDate {
	formatDate(date: string) {
		const formated_date = new Date(date).toLocaleDateString('pt-BR', {
			dateStyle: "medium"
		})

		return formated_date;
	}

	formatHour = (date: string): string => {
		const formated_hour = new Date(date).toLocaleTimeString('pt-BR', {
			hourCycle: "h24",
			hour: "2-digit",
			minute: "2-digit",
		})

		return formated_hour;
	}
}

export { FormatDate };