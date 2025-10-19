package com.example.demo.seeder;

import com.example.demo.dao.MatchDao;
import com.example.demo.dao.TeamDao;
import com.example.demo.dao.StadiumDao;
import com.example.demo.entity.League;
import com.example.demo.entity.Match;
import com.example.demo.entity.Stadium;
import com.example.demo.entity.Team;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class MatchSeeder {

	private final MatchDao matchRepository;
	private final TeamDao teamRepository;
	private final StadiumDao stadiumRepository;

	@Transactional
	public void seedMatches() {
		if (matchRepository.count() > 0) {
			return;
		}

		// Map teams by name
		Map<String, Team> teams = new HashMap<>();
		teamRepository.findAll().forEach(team -> teams.put(team.getName(), team));

		// Map stadiums by name
		Map<String, Stadium> stadiums = new HashMap<>();
		stadiumRepository.findAll().forEach(stadium -> stadiums.put(stadium.getName(), stadium));

		Match[] matches = new Match[] {
				// Premier League
				new Match(teams.get("Manchester United"), teams.get("Manchester City"), stadiums.get("Old Trafford"),
						LocalDateTime.parse("2025-11-01T16:00:00"), League.PREMIER),
				new Match(teams.get("Liverpool"), teams.get("Chelsea"), stadiums.get("Anfield"),
						LocalDateTime.parse("2025-11-02T18:30:00"), League.PREMIER),
				new Match(teams.get("Tottenham Hotspur"), teams.get("Arsenal"),
						stadiums.get("Tottenham Hotspur Stadium"), LocalDateTime.parse("2025-11-03T15:00:00"),
						League.PREMIER),
				new Match(teams.get("Leicester City"), teams.get("Everton"), stadiums.get("King Power Stadium"),
						LocalDateTime.parse("2025-11-04T17:30:00"), League.PREMIER),
				new Match(teams.get("Wolverhampton Wanderers"), teams.get("Newcastle United"),
						stadiums.get("Molineux Stadium"), LocalDateTime.parse("2025-11-05T16:00:00"), League.PREMIER),
				new Match(teams.get("Manchester City"), teams.get("Liverpool"), stadiums.get("Etihad Stadium"),
						LocalDateTime.parse("2025-11-06T19:00:00"), League.PREMIER),

				// La Liga
				new Match(teams.get("FC Barcelona"), teams.get("Real Madrid"), stadiums.get("Camp Nou"),
						LocalDateTime.parse("2025-11-01T20:00:00"), League.LALIGA),
				new Match(teams.get("Atlético Madrid"), teams.get("Sevilla FC"), stadiums.get("Metropolitano Stadium"),
						LocalDateTime.parse("2025-11-02T18:00:00"), League.LALIGA),
				new Match(teams.get("Athletic Bilbao"), teams.get("Valencia CF"), stadiums.get("San Mamés"),
						LocalDateTime.parse("2025-11-03T21:00:00"), League.LALIGA),
				new Match(teams.get("Real Sociedad"), teams.get("Real Betis"), stadiums.get("Reale Arena"),
						LocalDateTime.parse("2025-11-04T19:30:00"), League.LALIGA),
				new Match(teams.get("Espanyol"), teams.get("CA Osasuna"), stadiums.get("RCDE Stadium"),
						LocalDateTime.parse("2025-11-05T17:00:00"), League.LALIGA),
				new Match(teams.get("Real Madrid"), teams.get("Atlético Madrid"), stadiums.get("Santiago Bernabéu"),
						LocalDateTime.parse("2025-11-06T20:30:00"), League.LALIGA),

				// Serie A
				new Match(teams.get("AC Milan"), teams.get("Juventus"), stadiums.get("San Siro"),
						LocalDateTime.parse("2025-11-01T18:00:00"), League.SERIA),
				new Match(teams.get("AS Roma"), teams.get("Napoli"), stadiums.get("Stadio Olimpico"),
						LocalDateTime.parse("2025-11-02T20:30:00"), League.SERIA),
				new Match(teams.get("Fiorentina"), teams.get("Lazio"), stadiums.get("Stadio Artemio Franchi"),
						LocalDateTime.parse("2025-11-03T17:00:00"), League.SERIA),
				new Match(teams.get("Atalanta"), teams.get("Parma"), stadiums.get("Gewiss Stadium"),
						LocalDateTime.parse("2025-11-04T19:00:00"), League.SERIA),
				new Match(teams.get("Genoa"), teams.get("Inter Milan"), stadiums.get("Stadio Luigi Ferraris"),
						LocalDateTime.parse("2025-11-05T21:00:00"), League.SERIA),
				new Match(teams.get("Juventus"), teams.get("AS Roma"), stadiums.get("Juventus Stadium"),
						LocalDateTime.parse("2025-11-06T18:30:00"), League.SERIA),

				// Ligue 1
				new Match(teams.get("Paris Saint-Germain"), teams.get("Olympique de Marseille"),
						stadiums.get("Parc des Princes"), LocalDateTime.parse("2025-11-01T20:00:00"), League.LIGUE1),
				new Match(teams.get("AS Monaco"), teams.get("Olympique Lyonnais"), stadiums.get("Stade Louis II"),
						LocalDateTime.parse("2025-11-02T18:00:00"), League.LIGUE1),
				new Match(teams.get("Lille OSC"), teams.get("Stade Rennais"), stadiums.get("Stade Pierre-Mauroy"),
						LocalDateTime.parse("2025-11-03T21:00:00"), League.LIGUE1),
				new Match(teams.get("FC Nantes"), teams.get("RC Strasbourg"), stadiums.get("Stade de la Beaujoire"),
						LocalDateTime.parse("2025-11-04T19:30:00"), League.LIGUE1),
				new Match(teams.get("RC Lens"), teams.get("Stade de Reims"), stadiums.get("Stade Bollaert-Delelis"),
						LocalDateTime.parse("2025-11-05T17:00:00"), League.LIGUE1),
				new Match(teams.get("Olympique de Marseille"), teams.get("AS Monaco"), stadiums.get("Stade Vélodrome"),
						LocalDateTime.parse("2025-11-06T20:30:00"), League.LIGUE1),

				// Bundesliga
				new Match(teams.get("Bayern Munich"), teams.get("Borussia Dortmund"), stadiums.get("Allianz Arena"),
						LocalDateTime.parse("2025-11-01T19:00:00"), League.BUNDESLIGA),
				new Match(teams.get("RB Leipzig"), teams.get("Bayer Leverkusen"), stadiums.get("Red Bull Arena"),
						LocalDateTime.parse("2025-11-02T17:30:00"), League.BUNDESLIGA),
				new Match(teams.get("Borussia Mönchengladbach"), teams.get("Schalke 04"), stadiums.get("Borussia-Park"),
						LocalDateTime.parse("2025-11-03T20:00:00"), League.BUNDESLIGA),
				new Match(teams.get("Hertha BSC"), teams.get("VfL Wolfsburg"), stadiums.get("Olympiastadion"),
						LocalDateTime.parse("2025-11-04T18:00:00"), League.BUNDESLIGA),
				new Match(teams.get("VfB Stuttgart"), teams.get("SC Freiburg"), stadiums.get("Mercedes-Benz Arena"),
						LocalDateTime.parse("2025-11-05T21:00:00"), League.BUNDESLIGA),
				new Match(teams.get("Borussia Dortmund"), teams.get("RB Leipzig"), stadiums.get("Signal Iduna Park"),
						LocalDateTime.parse("2025-11-06T19:30:00"), League.BUNDESLIGA),

				// Champions League
				new Match(teams.get("Manchester City"), teams.get("Real Madrid"), stadiums.get("Etihad Stadium"),
						LocalDateTime.parse("2025-11-07T21:00:00"), League.CHAMPIONS_LEAGUE),
				new Match(teams.get("Paris Saint-Germain"), teams.get("Liverpool"), stadiums.get("Parc des Princes"),
						LocalDateTime.parse("2025-11-08T21:00:00"), League.CHAMPIONS_LEAGUE),
				new Match(teams.get("Bayern Munich"), teams.get("Juventus"), stadiums.get("Allianz Arena"),
						LocalDateTime.parse("2025-11-09T21:00:00"), League.CHAMPIONS_LEAGUE),
				new Match(teams.get("FC Barcelona"), teams.get("Chelsea"), stadiums.get("Camp Nou"),
						LocalDateTime.parse("2025-11-10T21:00:00"), League.CHAMPIONS_LEAGUE),
				new Match(teams.get("Atlético Madrid"), teams.get("Manchester United"),
						stadiums.get("Metropolitano Stadium"), LocalDateTime.parse("2025-11-11T21:00:00"),
						League.CHAMPIONS_LEAGUE),
				new Match(teams.get("Borussia Dortmund"), teams.get("AC Milan"), stadiums.get("Signal Iduna Park"),
						LocalDateTime.parse("2025-11-12T21:00:00"), League.CHAMPIONS_LEAGUE),
				new Match(teams.get("Napoli"), teams.get("Tottenham Hotspur"), stadiums.get("Stadio San Paolo"),
						LocalDateTime.parse("2025-11-13T21:00:00"), League.CHAMPIONS_LEAGUE),
				new Match(teams.get("AS Monaco"), teams.get("Arsenal"), stadiums.get("Stade Louis II"),
						LocalDateTime.parse("2025-11-14T21:00:00"), League.CHAMPIONS_LEAGUE),
				new Match(teams.get("RB Leipzig"), teams.get("Inter Milan"), stadiums.get("Red Bull Arena"),
						LocalDateTime.parse("2025-11-15T21:00:00"), League.CHAMPIONS_LEAGUE),
				new Match(teams.get("Sevilla FC"), teams.get("Bayer Leverkusen"), stadiums.get("Ramón Sánchez Pizjuán"),
						LocalDateTime.parse("2025-11-16T21:00:00"), League.CHAMPIONS_LEAGUE),

				// Europa League
				new Match(teams.get("AS Roma"), teams.get("Olympique de Marseille"), stadiums.get("Stadio Olimpico"),
						LocalDateTime.parse("2025-11-07T19:00:00"), League.EUROPA_LEAGUE),
				new Match(teams.get("Lille OSC"), teams.get("Real Betis"), stadiums.get("Stade Pierre-Mauroy"),
						LocalDateTime.parse("2025-11-08T19:00:00"), League.EUROPA_LEAGUE),
				new Match(teams.get("Atalanta"), teams.get("Athletic Bilbao"), stadiums.get("Gewiss Stadium"),
						LocalDateTime.parse("2025-11-09T19:00:00"), League.EUROPA_LEAGUE),
				new Match(teams.get("Valencia CF"), teams.get("VfL Wolfsburg"), stadiums.get("Mestalla Stadium"),
						LocalDateTime.parse("2025-11-10T19:00:00"), League.EUROPA_LEAGUE),
				new Match(teams.get("Borussia Mönchengladbach"), teams.get("Fiorentina"), stadiums.get("Borussia-Park"),
						LocalDateTime.parse("2025-11-11T19:00:00"), League.EUROPA_LEAGUE),
				new Match(teams.get("Fiorentina"), teams.get("Stade Rennais"), stadiums.get("Stadio Artemio Franchi"),
						LocalDateTime.parse("2025-11-12T19:00:00"), League.EUROPA_LEAGUE),
				new Match(teams.get("RC Lens"), teams.get("Leicester City"), stadiums.get("Stade Bollaert-Delelis"),
						LocalDateTime.parse("2025-11-13T19:00:00"), League.EUROPA_LEAGUE),
				new Match(teams.get("Genoa"), teams.get("Hertha BSC"), stadiums.get("Stadio Luigi Ferraris"),
						LocalDateTime.parse("2025-11-14T19:00:00"), League.EUROPA_LEAGUE),
				new Match(teams.get("Everton"), teams.get("SC Freiburg"), stadiums.get("Goodison Park"),
						LocalDateTime.parse("2025-11-15T19:00:00"), League.EUROPA_LEAGUE),
				new Match(teams.get("RC Strasbourg"), teams.get("Stade de Reims"), stadiums.get("Stade de la Meinau"),
						LocalDateTime.parse("2025-11-16T19:00:00"), League.EUROPA_LEAGUE),

		};

		matchRepository.saveAll(List.of(matches));
	}
}