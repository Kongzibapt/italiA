-- Table des paiements.
-- Flux : l'utilisateur déclare un paiement (status 'pending') après être passé
-- par Lydia, puis l'admin le confirme (status 'confirmed') une fois l'argent reçu.
-- À exécuter dans l'éditeur SQL Supabase.
create table if not exists public.payments (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  amount_eur   numeric(10, 2) not null check (amount_eur > 0),
  status       text not null default 'pending' check (status in ('pending', 'confirmed')),
  note         text,
  created_at   timestamptz not null default now(),
  confirmed_at timestamptz
);

create index if not exists payments_user_id_idx on public.payments(user_id);
create index if not exists payments_status_idx on public.payments(status);

-- RLS : seul le service role (côté serveur) y accède. Aucune policy publique.
alter table public.payments enable row level security;
