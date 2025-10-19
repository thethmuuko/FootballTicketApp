package com.example.demo.seeder;

import com.example.demo.dao.StadiumDao;
import com.example.demo.entity.Stadium;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class StadiumSeeder {
    private final StadiumDao stadiumRepository;

    @Transactional
    public void seedStadiums() {
        if (stadiumRepository.count() > 0) {
            return;
        }

        List<Stadium> stadiums = List.of(
                new Stadium("Old Trafford", "Sir Matt Busby Way, Manchester, England"),
                new Stadium("Etihad Stadium", "Manchester, England"),
                new Stadium("Anfield", "Liverpool, England"),
                new Stadium("Stamford Bridge", "London, England"),
                new Stadium("Tottenham Hotspur Stadium", "London, England"),
                new Stadium("Emirates Stadium", "London, England"),
                new Stadium("King Power Stadium", "Leicester, England"),
                new Stadium("Goodison Park", "Liverpool, England"),
                new Stadium("Molineux Stadium", "Wolverhampton, England"),
                new Stadium("St James Park", "Newcastle, England"),

                new Stadium("Camp Nou", "Barcelona, Spain"),
                new Stadium("Santiago Bernabéu", "Madrid, Spain"),
                new Stadium("Metropolitano Stadium", "Madrid, Spain"),
                new Stadium("Ramón Sánchez Pizjuán", "Sevilla, Spain"),
                new Stadium("San Mamés", "Bilbao, Spain"),
                new Stadium("Mestalla Stadium", "Valencia, Spain"),
                new Stadium("Reale Arena", "San Sebastián, Spain"),
                new Stadium("Benito Villamarín", "Sevilla, Spain"),
                new Stadium("RCDE Stadium", "Barcelona, Spain"),
                new Stadium("El Sadar", "Pamplona, Spain"),

                new Stadium("San Siro", "Milan, Italy"),
                new Stadium("Juventus Stadium", "Turin, Italy"),
                new Stadium("Stadio Olimpico", "Rome, Italy"),
                new Stadium("Stadio San Paolo", "Naples, Italy"),
                new Stadium("Stadio Artemio Franchi", "Florence, Italy"),
                new Stadium("San Siro 2", "Milan, Italy"),
                new Stadium("Gewiss Stadium", "Bergamo, Italy"),
                new Stadium("Stadio Ennio Tardini", "Parma, Italy"),
                new Stadium("Stadio Luigi Ferraris", "Genoa, Italy"),
                new Stadium("Stadio Olimpico 2", "Rome, Italy"),

                new Stadium("Parc des Princes", "Paris, France"),
                new Stadium("Stade Vélodrome", "Marseille, France"),
                new Stadium("Stade Louis II", "Monaco, France"),
                new Stadium("Groupama Stadium", "Lyon, France"),
                new Stadium("Stade Pierre-Mauroy", "Lille, France"),
                new Stadium("Roazhon Park", "Rennes, France"),
                new Stadium("Stade de la Beaujoire", "Nantes, France"),
                new Stadium("Stade de la Meinau", "Strasbourg, France"),
                new Stadium("Stade Bollaert-Delelis", "Lens, France"),
                new Stadium("Stade Auguste-Delaune", "Reims, France"),

                new Stadium("Allianz Arena", "Munich, Germany"),
                new Stadium("Signal Iduna Park", "Dortmund, Germany"),
                new Stadium("Red Bull Arena", "Leipzig, Germany"),
                new Stadium("BayArena", "Leverkusen, Germany"),
                new Stadium("Borussia-Park", "Mönchengladbach, Germany"),
                new Stadium("Veltins-Arena", "Gelsenkirchen, Germany"),
                new Stadium("Olympiastadion", "Berlin, Germany"),
                new Stadium("Volkswagen Arena", "Wolfsburg, Germany"),
                new Stadium("Mercedes-Benz Arena", "Stuttgart, Germany"),
                new Stadium("Europa-Park Stadion", "Freiburg, Germany")
        );

        stadiumRepository.saveAll(stadiums);
    }
}
