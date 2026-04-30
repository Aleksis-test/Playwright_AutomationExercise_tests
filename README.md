# 🎭 Playwright_AutomationExercise_tests

Projekt przedstawia kompletny framework automatycznych testów end-to-end przygotowany dla aplikacji webowej AutomationExercise.

Celem repozytorium było stworzenie stabilnego i skalowalnego środowiska testowego, które odwzorowuje rzeczywiste podejście do pracy QA Automation Engineer — od analizy scenariuszy testowych, przez implementację testów UI oraz API, aż po konteneryzację i uruchamianie testów w pipeline CI/CD.

Framework został zbudowany w oparciu o nowoczesne praktyki automatyzacji:

- architekturę Page Object Model,
- własne fixture i helpery,
- obsługę autoryzacji poprzez storage state,
- uruchamianie testów w kontenerze Docker,
- automatyczne wykonywanie testów z wykorzystaniem GitHub Actions.

Projekt pełni funkcję portfolio testerskiego oraz demonstracji umiejętności tworzenia profesjonalnego środowiska automatycznych testów gotowego do dalszej rozbudowy i integracji.

## 📌 Cel projektu

Głównym celem projektu było zaprojektowanie i wdrożenie profesjonalnego frameworka automatycznych testów UI/API, który odzwierciedla standardy wykorzystywane w rzeczywistych projektach komercyjnych.

Założeniem było nie tylko zautomatyzowanie kluczowych scenariuszy biznesowych aplikacji AutomationExercise, ale również przygotowanie kompletnego środowiska testowego obejmującego:

- czytelną i łatwą w utrzymaniu architekturę kodu,
- wielokrotnego użytku komponenty Page Object Model,
- własne fixture oraz funkcje pomocnicze,
- stabilne zarządzanie autoryzacją użytkownika,
- izolowane uruchamianie testów w kontenerze Docker,
- automatyczne wykonywanie testów po każdym wdrożeniu kodu dzięki GitHub Actions.

## 🚀 Zastosowane technologie

W projekcie wykorzystano zestaw narzędzi pozwalających na stworzenie nowoczesnego, stabilnego i łatwego w utrzymaniu frameworka automatycznych testów:

- **Playwright UI Testing** – automatyzacja testów end-to-end interfejsu webowego,
- **Playwright API Testing (Request Context)** – testowanie endpointów REST API bezpośrednio na warstwie backendowej,
- **TypeScript** – język programowania zapewniający typowanie oraz większą kontrolę nad strukturą kodu,
- **Page Object Model (POM)** – wzorzec projektowy zwiększający czytelność i reużywalność testów,
- **Custom Fixtures** – własne rozszerzenia Playwright usprawniające przygotowanie danych testowych i stanów początkowych,
- **Storage State Authentication** – obsługa zapisanej sesji użytkownika dla testów wymagających logowania,
- **Docker** – konteneryzacja środowiska testowego i izolowane uruchamianie testów,
- **GitHub Actions** – automatyczny pipeline CI/CD uruchamiający testy po każdym pushu do repozytorium,
- **Git / GitHub** – wersjonowanie kodu i zarządzanie projektem,
- **Microsoft Excel** – przygotowanie przypadków testowych oraz dokumentacji manualnej,
- **Microsoft Word** – dokumentacja frameworka i raport końcowy z wykonania testów.

## 📁 Struktura projektu

```bash
.github/workflows/      # konfiguracja GitHub Actions CI
fixtures/               # własne fixture Playwright
pages/                  # klasy Page Object Model
test-data-files/        # pliki wykorzystywane w testach
test-documentation/     # dokumentacja testowa: test cases, raporty, dokumentacja projektu
tests/
├── api/                # testy REST API
├── setup/              # przygotowanie sesji użytkownika i zapis storage state
├── ui-auth/            # testy UI wymagające zalogowanego użytkownika
└── ui-public/          # testy UI dostępne bez logowania
types/                  # typy TypeScript
utils/                  # dane testowe i funkcje pomocnicze
Dockerfile              # konfiguracja obrazu Docker
playwright.config.ts    # główna konfiguracja Playwright
```
Struktura została podzielona według odpowiedzialności, aby ułatwić utrzymanie testów, ponowne wykorzystanie kodu oraz rozbudowę frameworka o kolejne scenariusze.



## ▶️ Instalacja i uruchomienie projektu

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/Aleksis-test/Playwright_AutomationExercise_tests.git
cd Playwright_AutomationExercise_tests

```
2. Instalacja zależności
```bash
npm install
```
3. Instalacja przeglądarek Playwright
```bash
npx playwright install
```
4. Uruchomienie wszystkich testów lokalnie
```bash
npx playwright test
```
5. Uruchomienie testów z interfejsem UI
```bash
npx playwright test --ui
```
6. Uruchomienie wybranego projektu testowego

Testy publiczne:
```bash
npx playwright test --project=chromium-public
```
Testy użytkownika zalogowanego:
```bash
npx playwright test --project=chromium-auth
```
Testy API:
```bash
npx playwright test --project=api
```

## 🐳 Uruchamianie testów w kontenerze Docker

Framework został przygotowany do uruchamiania w izolowanym środowisku Docker, co zapewnia:

- spójność środowiska testowego niezależnie od systemu operacyjnego,
- stabilne wersjonowanie zależności,
- możliwość łatwego uruchamiania testów w pipeline CI/CD.

### Budowanie obrazu Docker

```bash
docker build -t playwright-tests .
```
Uruchamianie testów w kontenerze
```bash
docker run --rm playwright-tests
```
Kontener automatycznie:

instaluje wszystkie zależności,
wykorzystuje skonfigurowane przeglądarki Playwright,
uruchamia pełną paczkę testów UI oraz API.

## ⚙️ Continuous Integration — GitHub Actions

Projekt posiada skonfigurowany pipeline CI/CD w GitHub Actions.

Pipeline uruchamia się automatycznie po każdym pushu do gałęzi `main` oraz może zostać uruchomiony ręcznie z poziomu zakładki **Actions**.

### Pipeline wykonuje następujące kroki:

- pobranie kodu z repozytorium,
- zbudowanie obrazu Docker,
- uruchomienie testów Playwright w kontenerze,
- zapisanie raportu testowego jako artifact.

Dzięki temu testy są wykonywane w izolowanym środowisku Linux, niezależnym od lokalnej konfiguracji komputera.

### Aktualny status pipeline

Status uruchomień można sprawdzić w zakładce **Actions** w repozytorium.

## ✅ Zakres zautomatyzowanych testów

Framework obejmuje automatyzację kluczowych scenariuszy biznesowych aplikacji AutomationExercise zarówno na poziomie interfejsu użytkownika, jak i warstwy API.

### UI Tests — użytkownik niezalogowany

- rejestracja użytkownika (etap podstawowy oraz formularz szczegółowy),
- walidacja pól obowiązkowych formularza rejestracji,
- logowanie użytkownika,
- walidacja błędnych danych logowania,
- formularz kontaktowy wraz z walidacją oraz uploadem pliku,
- nawigacja pomiędzy głównymi podstronami aplikacji,
- przeglądanie kategorii oraz listy produktów.

### UI Tests — użytkownik zalogowany

- dodawanie produktów do koszyka z różnych widoków aplikacji,
- obsługa koszyka zakupowego,
- weryfikacja cen, ilości oraz wartości całkowitej zamówienia,
- finalizacja procesu zamówienia,
- usuwanie produktów z koszyka,
- testy scenariuszy zakupowych wymagających autoryzacji.

### API Tests

- pełny cykl życia użytkownika przez REST API:
  - utworzenie konta,
  - logowanie,
  - aktualizacja danych,
  - pobranie szczegółów użytkownika,
  - usunięcie konta,
- walidacja błędnych requestów logowania,
- pobieranie listy produktów,
- weryfikacja struktury danych produktów,
- pobieranie listy marek,
- wyszukiwanie produktów po nazwie,
- walidacja requestów bez wymaganych parametrów.

### Known Bugs

W ramach projektu celowo pozostawiono również testy dokumentujące wykryte błędy aplikacji, oznaczone tagiem @bug w tytule testu, aby zachować pełną informację o jakości testowanego systemu.

## 📄 Dokumentacja testowa

W repozytorium została również przygotowana kompletna dokumentacja wspierająca proces testowy.

Folder `test-documentation` zawiera:

- **AutomationExercise_TestCases.xlsx** – zestaw manualnych przypadków testowych obejmujących najważniejsze scenariusze biznesowe,
- **Framework_Documentation.docx** – dokumentację techniczną opisującą architekturę frameworka, zastosowane rozwiązania oraz sposób działania projektu,
- **Final_Test_Report.docx** – końcowy raport podsumowujący wykonanie testów, wykryte błędy oraz ocenę jakości aplikacji.

Dzięki temu projekt przedstawia pełny proces pracy testera automatyzującego: od przygotowania analizy testowej, przez implementację automatyzacji, aż po raportowanie wyników.

## 📈 Podsumowanie projektu

Projekt został zrealizowany jako praktyczna symulacja pracy QA Automation Engineer i stanowi połączenie kompetencji z zakresu:

- automatyzacji testów UI,
- automatyzacji testów API,
- projektowania architektury frameworka testowego,
- konteneryzacji środowiska uruchomieniowego,
- konfiguracji pipeline CI/CD,
- przygotowania pełnej dokumentacji testerskiej.

Głównym założeniem było stworzenie rozwiązania możliwie zbliżonego do standardów spotykanych w komercyjnych projektach testerskich, z naciskiem na stabilność, czytelność kodu, możliwość rozbudowy oraz profesjonalne raportowanie jakości aplikacji.

## 👩‍💻 Autor

Projekt wykonany przez **Aleksandrę Janas** jako portfolio QA Automation.