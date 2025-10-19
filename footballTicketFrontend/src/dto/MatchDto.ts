import type { TeamDto } from "./TeamDto"

export type MatchDto = {
	id: number,
	homeTeam: TeamDto,
	awayTeam: TeamDto,
	statium: string,
	statiumAddress: string,
	league: string,
	kickOff: string
}