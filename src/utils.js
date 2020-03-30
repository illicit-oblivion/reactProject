export function btnLanguage(language,type)  {
    return language === "en"?translations[type].en: translations[type].ru;
}
const translations = {
    close:{
        en:"close",
        ru:"закрыть"
    },
    open:{
        en:"open",
        ru:"открыть"
    }
}
