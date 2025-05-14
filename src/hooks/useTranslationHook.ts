import i18n from '@config/translation';

export const useTranslation = () => {
  const t = (name: string) => i18n.t(name);
  return {
    t,
  };
};
