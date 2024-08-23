# Co skript dělá?
Projde všechny kampaně v účtu a přidá do nich custom parametr s názvem kampaně a tracking template. Neřeší přidávání UTM parametrů s názvy ad groupy, reklam či podobné věci. Jde jen o základní měření na úrovni kampaně. Ale snadno si tam můžete přidat další funkcionality. Přidává to do všech aktivních i zapauzovaných kampaní. Jedná se o nejzákladnější varianty skriptu.

# Jak často skript odbíhat?
Určitě bych naplánoval pravidelné odbíhání skriptu. Vše odbíhám pořád na všech kampaních, protože názvy kampaní se mohou změnit a asi pak chcete měnit i UTM parametry. Pokud ne, můžete dát kampaním ve skriptu label a na nich již nic dalšího neodbíhat. Já mám nastavený skript na odbíhání každou hodinu, ničemu to nevadí a zaručí vám, že vše bude správně otagované.

# Které kampaně podporuje?
V současnosti podporuje všechny, které podporuje Google Ads Scripts. Patří mezí ně Search, Display, Video, Shopping, pMax. Bohužel DemandGen kampaně nejsou v Google Ads skriptech nyní podporovány. U nich musíte přidat UTM parametry manuálně.

# Přidání UTM parametrů do kampaní
Tento jednoduchý skript přidá UTM parametry do kampaní, konkrétně přidá tento tracking template:
* utm_source=google
* utm_medium=cpc
* utm_campaign=Název kampaně
* utm_id=ID kampaně

Pokud chcete něco přidat, změnit či odebrat, tak jen upravte řádek s tracking templatem:
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={_campaign}&utm_id=" + campaign.getId()

# Proč ve skriptu nastavuji custom parametr a nepoužívám valueTrack parametr
Bohužel Google Ads narozdíl od SA360 nepodporují valueTrack s názvem kampaně. Musíme tedy přes skript vzít název kampaně, uložit ho jako custom parametr a ten pak vložit do daného templatu. Proč nepoužívám valueTrack u campaignId si již nepamatuji, ale klidně to můžete nahradit, na funkcionalitě to nic nemění. Kdybyste chtěli tracking o něco obohatit, tak seznam valueTrack parametrů je zde:
https://support.google.com/google-ads/answer/6305348?hl=en#zippy=%2Ctracking-template-only%2Cfinal-url-only%2Cshopping-campaigns-only%2Cperformance-max-campaigns%2Cfinal-url-tracking-template-or-custom-parameter

# Jak často skript odbíhat?
Určitě bych naplánoval pravidelné odbíhání skriptu. Vše odbíhám pořád na všech kampaních, protože názvy kampaní se mohou změnit a asi pak chcete měnit i UTM parametry. Pokud ne, můžete dát kampaním ve skriptu label a na nich již nic dalšího neodbíhat.

# Limity
* MCC skript běží na max 50 účtech. Pokud potřebujete víc, můžete do skriptu přidat batching.
* Jak jsem psal, také nejsou podporovány Demand Gen kampaně, u nich musíte přidat utm tracking manuálně.
* Pokud máte fakt hoooodně kampaní, tak by teoreticky mohl skript timeoutovat, ale spíše si to nemyslím.
