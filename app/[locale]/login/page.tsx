import { LoginForm } from '@/components/login-form'
import { useTranslations } from 'next-intl'

export default function LoginPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = useTranslations('auth')

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{t('welcomeBack')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('enterCredentials')}
          </p>
        </div>
        <LoginForm locale={locale} />
      </div>
    </div>
  )
}

