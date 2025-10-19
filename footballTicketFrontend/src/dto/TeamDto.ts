import type { StadiumDto } from "./StadiumDto"

export type TeamDto = {
    teamId: number,
    teamName: string,
    logo: string,
    stadium: StadiumDto,
    league: string
}