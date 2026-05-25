import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'baptiste1296@gmail.com';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Vérifier que le caller est l'admin
  const authHeader = getHeader(event, 'authorization') ?? '';
  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);

  if (!user || user.email !== ADMIN_EMAIL) {
    throw createError({ statusCode: 403, message: 'Forbidden' });
  }

  const { userId } = await readBody(event);
  if (!userId) throw createError({ statusCode: 400, message: 'Missing userId' });

  const { error } = await supabase
    .from('profiles')
    .update({ verified: true })
    .eq('id', userId);

  if (error) throw createError({ statusCode: 500, message: error.message });

  // Récupérer l'email de l'utilisateur pour lui envoyer le mail de bienvenue
  const { data: { user: newUser } } = await supabase.auth.admin.getUserById(userId);
  const userEmail = newUser?.email;

  if (userEmail) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'italiA <onboarding@resend.dev>',
        to: [userEmail],
        subject: 'Bienvenue sur italiA — ton aventure commence maintenant 🇮🇹',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
            <h1 style="font-size:24px;margin-bottom:8px;">Ciao !</h1>
            <p style="color:#444;margin-bottom:24px;">
              Ton compte italiA vient d'être activé. Tu peux désormais te connecter et commencer à apprendre l'italien.
            </p>

            <p style="font-weight:600;font-size:16px;margin-bottom:16px;">Ce qui t'attend :</p>

            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top;width:32px;">🎓</td>
                <td style="padding:12px 0;border-bottom:1px solid #eee;">
                  <strong>Des leçons progressives</strong><br>
                  <span style="color:#555;font-size:14px;">Chaque leçon est découpée en étapes courtes — vocabulaire, grammaire, exemples culturels — avec des exercices à chaque section pour ancrer ce que tu viens d'apprendre.</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top;">☕</td>
                <td style="padding:12px 0;border-bottom:1px solid #eee;">
                  <strong>Marco, ton barista-professeur</strong><br>
                  <span style="color:#555;font-size:14px;">À la fin de chaque leçon, Marco t'attend pour une vraie conversation en italien. Il s'adapte à ton niveau, corrige tes erreurs avec bienveillance et t'explique pourquoi.</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eee;vertical-align:top;">💡</td>
                <td style="padding:12px 0;border-bottom:1px solid #eee;">
                  <strong>Les mots cliquables</strong><br>
                  <span style="color:#555;font-size:14px;">Dans les leçons, clique sur n'importe quel mot italien pour obtenir sa traduction instantanément et l'ajouter à ton vocabulaire personnel.</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;vertical-align:top;">📈</td>
                <td style="padding:12px 0;">
                  <strong>Ta progression sauvegardée</strong><br>
                  <span style="color:#555;font-size:14px;">Chaque leçon complétée est mémorisée. Tu reprends exactement là où tu t'es arrêté, même le lendemain.</span>
                </td>
              </tr>
            </table>

            <div style="margin:32px 0;text-align:center;">
              <a href="https://italia-ten.vercel.app"
                style="background:#90CAF9;color:white;padding:14px 32px;border-radius:24px;text-decoration:none;font-weight:bold;font-size:15px;display:inline-block;">
                Accéder à italiA →
              </a>
            </div>

            <p style="color:#888;font-size:13px;border-top:1px solid #eee;padding-top:16px;margin-top:8px;">
              A presto e buono studio! 🇮🇹<br>
              <strong>italiA</strong>
            </p>
          </div>
        `,
      }),
    });
  }

  return { success: true };
});
