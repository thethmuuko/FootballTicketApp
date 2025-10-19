package com.example.demo.seeder;

import com.example.demo.dao.StadiumDao;
import com.example.demo.dao.TeamDao;
import com.example.demo.entity.League;
import com.example.demo.entity.Team;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TeamSeeder {

	private final TeamDao teamRepository;
	private final StadiumDao stadiumRepository;

	@Transactional
	public void seedTeams() {
		if (teamRepository.count() > 0) {
			return;
		}

		List<Team> teams = List.of(
				// Premier League
				new Team("Manchester United",
						"https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1184px-Manchester_United_FC_crest.svg.png",
						League.PREMIER, stadiumRepository.findByName("Old Trafford").orElseThrow()),
				new Team("Manchester City",
						"https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
						League.PREMIER, stadiumRepository.findByName("Etihad Stadium").orElseThrow()),
				new Team("Liverpool",
						"https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/879px-Liverpool_FC.svg.png",
						League.PREMIER, stadiumRepository.findByName("Anfield").orElseThrow()),
				new Team("Chelsea",
						"https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
						League.PREMIER, stadiumRepository.findByName("Stamford Bridge").orElseThrow()),
				new Team("Tottenham Hotspur",
						"https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/584px-Tottenham_Hotspur.svg.png",
						League.PREMIER, stadiumRepository.findByName("Tottenham Hotspur Stadium").orElseThrow()),
				new Team("Arsenal",
						"https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1021px-Arsenal_FC.svg.png",
						League.PREMIER, stadiumRepository.findByName("Emirates Stadium").orElseThrow()),
				new Team("Leicester City",
						"https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png",
						League.PREMIER, stadiumRepository.findByName("King Power Stadium").orElseThrow()),
				new Team("Everton",
						"https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Everton_FC_logo.svg/1174px-Everton_FC_logo.svg.png",
						League.PREMIER, stadiumRepository.findByName("Goodison Park").orElseThrow()),
				new Team("Wolverhampton Wanderers",
						"https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Wolverhampton_Wanderers_FC_crest.svg/1200px-Wolverhampton_Wanderers_FC_crest.svg.png",
						League.PREMIER, stadiumRepository.findByName("Molineux Stadium").orElseThrow()),
				new Team("Newcastle United",
						"https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Newcastle_United_Logo.svg/1192px-Newcastle_United_Logo.svg.png",
						League.PREMIER, stadiumRepository.findByName("St James Park").orElseThrow()),

				// La Liga
				new Team("FC Barcelona",
						"https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
						League.LALIGA, stadiumRepository.findByName("Camp Nou").orElseThrow()),
				new Team("Real Madrid",
						"https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
						League.LALIGA, stadiumRepository.findByName("Santiago Bernabéu").orElseThrow()),
				new Team("Atlético Madrid",
						"https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Atletico_Madrid_Logo_2024.svg/935px-Atletico_Madrid_Logo_2024.svg.png",
						League.LALIGA, stadiumRepository.findByName("Metropolitano Stadium").orElseThrow()),
				new Team("Sevilla FC",
						"https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png",
						League.LALIGA, stadiumRepository.findByName("Ramón Sánchez Pizjuán").orElseThrow()),
				new Team("Athletic Bilbao",
						"https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Club_Athletic_Bilbao_logo.svg/180px-Club_Athletic_Bilbao_logo.svg.png",
						League.LALIGA, stadiumRepository.findByName("San Mamés").orElseThrow()),
				new Team("Valencia CF",
						"https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Valenciacf.svg/953px-Valenciacf.svg.png",
						League.LALIGA, stadiumRepository.findByName("Mestalla Stadium").orElseThrow()),
				new Team("Real Sociedad",
						"https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Real_Sociedad_logo.svg/1044px-Real_Sociedad_logo.svg.png",
						League.LALIGA, stadiumRepository.findByName("Reale Arena").orElseThrow()),
				new Team("Real Betis",
						"https://upload.wikimedia.org/wikipedia/fr/thumb/1/13/Real_betis_logo.svg/2493px-Real_betis_logo.svg.png",
						League.LALIGA, stadiumRepository.findByName("Benito Villamarín").orElseThrow()),
				new Team("Espanyol",
						"https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Rcd_espanyol_logo.svg/1200px-Rcd_espanyol_logo.svg.png",
						League.LALIGA, stadiumRepository.findByName("RCDE Stadium").orElseThrow()),
				new Team("CA Osasuna",
						"https://upload.wikimedia.org/wikipedia/en/thumb/3/38/CA_Osasuna_2024_crest.svg/895px-CA_Osasuna_2024_crest.svg.png",
						League.LALIGA, stadiumRepository.findByName("El Sadar").orElseThrow()),

				// Serie A
				new Team("AC Milan",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/765px-Logo_of_AC_Milan.svg.png",
						League.SERIA, stadiumRepository.findByName("San Siro").orElseThrow()),
				new Team("Juventus",
						"https://upload.wikimedia.org/wikipedia/commons/d/da/Juventus_Logo.png",
						League.SERIA, stadiumRepository.findByName("Juventus Stadium").orElseThrow()),
				new Team("AS Roma",
						"https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/AS_Roma_logo_%282017%29.svg/927px-AS_Roma_logo_%282017%29.svg.png",
						League.SERIA, stadiumRepository.findByName("Stadio Olimpico").orElseThrow()),
				new Team("Napoli",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Neapel.svg/1200px-SSC_Neapel.svg.png",
						League.SERIA, stadiumRepository.findByName("Stadio San Paolo").orElseThrow()),
				new Team("Fiorentina",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/ACF_Fiorentina.svg/1378px-ACF_Fiorentina.svg.png",
						League.SERIA, stadiumRepository.findByName("Stadio Artemio Franchi").orElseThrow()),
				new Team("Inter Milan",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/250px-FC_Internazionale_Milano_2021.svg.png",
						League.SERIA, stadiumRepository.findByName("San Siro 2").orElseThrow()),
				new Team("Atalanta",
						"https://upload.wikimedia.org/wikipedia/en/thumb/6/66/AtalantaBC.svg/732px-AtalantaBC.svg.png",
						League.SERIA, stadiumRepository.findByName("Gewiss Stadium").orElseThrow()),
				new Team("Parma",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_Parma_Calcio_1913_%28adozione_2016%29.svg/983px-Logo_Parma_Calcio_1913_%28adozione_2016%29.svg.png",
						League.SERIA, stadiumRepository.findByName("Stadio Ennio Tardini").orElseThrow()),
				new Team("Genoa",
						"https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Genoa_CFC_crest.svg/896px-Genoa_CFC_crest.svg.png",
						League.SERIA, stadiumRepository.findByName("Stadio Luigi Ferraris").orElseThrow()),
				new Team("Lazio",
						"https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/US_Sassuolo_Calcio_logo.svg/1095px-US_Sassuolo_Calcio_logo.svg.png",
						League.SERIA, stadiumRepository.findByName("Stadio Olimpico 2").orElseThrow()),

				// Ligue 1
				new Team("Paris Saint-Germain",
						"https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png",
						League.LIGUE1, stadiumRepository.findByName("Parc des Princes").orElseThrow()),
				new Team("Olympique de Marseille",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Olympique_Marseille_logo.svg/927px-Olympique_Marseille_logo.svg.png",
						League.LIGUE1, stadiumRepository.findByName("Stade Vélodrome").orElseThrow()),
				new Team("AS Monaco",
						"https://upload.wikimedia.org/wikipedia/en/c/cf/LogoASMonacoFC2021.svg",
						League.LIGUE1, stadiumRepository.findByName("Stade Louis II").orElseThrow()),
				new Team("Olympique Lyonnais",
						"https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Olympique_Lyonnais_logo.svg/1031px-Olympique_Lyonnais_logo.svg.png",
						League.LIGUE1, stadiumRepository.findByName("Groupama Stadium").orElseThrow()),
				new Team("Lille OSC",
						"https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Lille_OSC_2018_logo.svg/250px-Lille_OSC_2018_logo.svg.png",
						League.LIGUE1, stadiumRepository.findByName("Stade Pierre-Mauroy").orElseThrow()),
				new Team("Stade Rennais",
						"https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Stade_Rennais_FC.svg/983px-Stade_Rennais_FC.svg.png",
						League.LIGUE1, stadiumRepository.findByName("Roazhon Park").orElseThrow()),
				new Team("FC Nantes",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Logo_FC_Nantes_%28avec_fond%29_-_2019.svg/931px-Logo_FC_Nantes_%28avec_fond%29_-_2019.svg.png",
						League.LIGUE1, stadiumRepository.findByName("Stade de la Beaujoire").orElseThrow()),
				new Team("RC Strasbourg",
						"https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Racing_Club_de_Strasbourg_logo.svg/1200px-Racing_Club_de_Strasbourg_logo.svg.png",
						League.LIGUE1, stadiumRepository.findByName("Stade de la Meinau").orElseThrow()),
				new Team("RC Lens",
						"https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/RC_Lens_logo.svg/893px-RC_Lens_logo.svg.png",
						League.LIGUE1, stadiumRepository.findByName("Stade Bollaert-Delelis").orElseThrow()),
				new Team("Stade de Reims",
						"https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Stade_de_Reims_logo.svg/606px-Stade_de_Reims_logo.svg.png",
						League.LIGUE1, stadiumRepository.findByName("Stade Auguste-Delaune").orElseThrow()),

				// Bundesliga
				new Team("Bayern Munich",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/2048px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
						League.BUNDESLIGA, stadiumRepository.findByName("Allianz Arena").orElseThrow()),
				new Team("Borussia Dortmund",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png",
						League.BUNDESLIGA, stadiumRepository.findByName("Signal Iduna Park").orElseThrow()),
				new Team("RB Leipzig",
						"https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_Leipzig_2014_logo.svg/1200px-RB_Leipzig_2014_logo.svg.png",
						League.BUNDESLIGA, stadiumRepository.findByName("Red Bull Arena").orElseThrow()),
				new Team("Bayer Leverkusen",
						"https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Bayer_04_Leverkusen_logo.svg/1200px-Bayer_04_Leverkusen_logo.svg.png",
						League.BUNDESLIGA, stadiumRepository.findByName("BayArena").orElseThrow()),
				new Team("Borussia Mönchengladbach",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Borussia_M%C3%B6nchengladbach_logo.svg/1283px-Borussia_M%C3%B6nchengladbach_logo.svg.png",
						League.BUNDESLIGA, stadiumRepository.findByName("Borussia-Park").orElseThrow()),
				new Team("Schalke 04",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/FC_Schalke_04_Logo.svg/1200px-FC_Schalke_04_Logo.svg.png",
						League.BUNDESLIGA, stadiumRepository.findByName("Veltins-Arena").orElseThrow()),
				new Team("Hertha BSC",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Hertha_BSC_Logo_2012.svg/1200px-Hertha_BSC_Logo_2012.svg.png",
						League.BUNDESLIGA, stadiumRepository.findByName("Olympiastadion").orElseThrow()),
				new Team("VfL Wolfsburg",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/VfL_Wolfsburg_Logo.svg/1200px-VfL_Wolfsburg_Logo.svg.png",
						League.BUNDESLIGA, stadiumRepository.findByName("Volkswagen Arena").orElseThrow()),
				new Team("VfB Stuttgart",
						"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/VfB_Stuttgart_1893_Logo.svg/1103px-VfB_Stuttgart_1893_Logo.svg.png",
						League.BUNDESLIGA, stadiumRepository.findByName("Mercedes-Benz Arena").orElseThrow()),
				new Team("SC Freiburg",
						"https://upload.wikimedia.org/wikipedia/en/6/6d/SC_Freiburg_logo.svg",
						League.BUNDESLIGA, stadiumRepository.findByName("Europa-Park Stadion").orElseThrow()));

		teamRepository.saveAll(teams);
	}
}