-- Recalcule cost_usd des appels Claude avec les nouveaux tarifs Haiku (juin 2026) :
--   entrée : 1 $ / million de tokens
--   sortie : 5 $ / million de tokens
-- Les lignes Deepgram (endpoint = 'transcribe') sont EXCLUES : leur input_tokens
-- stocke des centisecondes et leur tarif n'a pas changé.
-- À exécuter dans l'éditeur SQL Supabase.

-- 1. (Optionnel) Aperçu avant/après pour vérifier l'impact
select
  count(*)                                                    as lignes_concernees,
  round(sum(cost_usd)::numeric, 4)                            as cout_actuel_usd,
  round(sum(input_tokens * 1.0 / 1000000
          + output_tokens * 5.0 / 1000000)::numeric, 4)       as cout_recalcule_usd
from public.api_usage
where endpoint <> 'transcribe';

-- 2. Mise à jour effective
update public.api_usage
set cost_usd = input_tokens * (1.0 / 1000000)
             + output_tokens * (5.0 / 1000000)
where endpoint <> 'transcribe';
