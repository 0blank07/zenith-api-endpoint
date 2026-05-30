I know what you are doing, queries the api for top 100 players but we can't guarantee every position player is in top 100,


   here is what I think you should do I just research and here is strategy first tell me if this is good logical and can be done:
   first I will clear this @src/utils/renderzDictionary.ts skills
    eg.   "NAME_SKILL_10031": "Physical",
          "NAME_SKILL_10032": "Physical",
   I took above skill from renderzdictionary.ts so you can see both skill are physical but why skill id is different one is 10031 but other skill id is 10032 because
   10031 skill gives boosts:
   
Level 1
Positions
-
Ball Control
+3
Strength
+3
Balance
+3

Level 2
Positions
-
Ball Control
+6
Strength
+6
Balance
+6

Level 3
Positions
-
Ball Control
+9
Strength
+9
Balance
+9



But 10032 skill gives boosts:

Edit Physical

Level 1
Positions
-
Ball Control
+1
Strength
+1
Balance
+1

Level 2
Positions
ST, RM
Ball Control
+2
Strength
+2
Balance
+2

Level 3
Positions
ST, RM
Ball Control
+3
Strength
+3
Balance
+3

You can see here 10031 and 10032 both skills are called physical but both skills gives different boosts different 
now you understood right?



So my strategy is:
url: https://renderz.app/24/players?skills=%5B%2210032%22%5D
from url you just have to replace this 10032 with skill id's from this file src/utils/renderzDictionary.ts from starting example:
renderzDictionary.ts starts with:
export const RENDERZ_DICTIONARY: Record<string, string> = {
  "NAME_SKILL_10010": "Shooting",
  "NAME_SKILL_10011": "Shooting",
  "NAME_SKILL_10012": "Shooting",
  "NAME_SKILL_10020": "Passing",
  "NAME_SKILL_10021": "Passing",


so we will take first one from dictionary: "NAME_SKILL_10010": "Shooting",
url will be: https://renderz.app/24/players?skills=%5B%2210010%22%5D
so now you have to go to this url and click on first player then scrape skill boosts create new file 
for skill boosts, so we can put skill_id = 10010 = shooting = 
Level 1
Positions
-
Finishing
+5
Shot Power
+5
Long Shot
+5

Level 2
Positions
ST
Finishing
+10
Shot Power
+10
Long Shot
+10

Level 3
Positions
ST
Finishing
+15
Shot Power
+15
Long Shot
+15

done 

next
export const RENDERZ_DICTIONARY: Record<string, string> = {
  "NAME_SKILL_10010": "Shooting",
  "NAME_SKILL_10011": "Shooting",
  "NAME_SKILL_10012": "Shooting",
  "NAME_SKILL_10020": "Passing",
  "NAME_SKILL_10021": "Passing",


this is :
  "NAME_SKILL_10011": "Shooting",
so then we will replace url:
https://renderz.app/24/players?skills=%5B%2210032%22%5D
with:
https://renderz.app/24/players?skills=%5B%2210011%22%5D
so on repeat

for requirements you already found out parent child skill.

after all renderzdictionary.ts skills boosts after getting we don't have to worry about anything if we have
skill id then we already have renderzdictionary.ts which have names then and we also created file for boosts as you know by using above method then all sortout

now analyze all the what I said and tell me in simple words is this good idea all this strategy?
if yes then explain in simple words what you understood