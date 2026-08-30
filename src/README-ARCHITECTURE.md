# Arquitetura

O projeto é deliberadamente client-side nesta fase.

- `engine.ts`: estado e simulação da partida.
- `replay.ts`: histórico de frames para revisão.
- `rules.ts`: regras e avaliação das decisões.
- `teams.ts`: configurações das equipes.
- `playerVisual.ts`: representação visual dos jogadores.
- `camera.ts`: presets e acompanhamento de lance.
- `field.ts`: construção do campo 3D.
- `scoring.ts`: pontuação do árbitro.
- `main.tsx`: composição da aplicação e interface.

A IA não é requisito para o loop principal. Backend e persistência serão adicionados somente quando trouxerem valor real.