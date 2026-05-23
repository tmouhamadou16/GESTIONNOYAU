export class Mesure{

    id: number;

    coup: string;

    epaule: string;

    mache: string;

    tourM: string;

    poitrine: string;

    taille: string;

    longueurB: string;

    longueurGB: string;

    ceinture: string;

    hanche: string;

    fesse: string;

    cuisse: string;

    genou: string;

    pantalonL: string;

    bas: string;

    constructor(id = 0, coup = '', epaule = '', mache = '', tourM = '', poitrine = '', taille = '', longueurB = '', longueurGB = '', ceinture = '', hanche = '', fesse = '', cuisse = '', genou = '', pantalonL = '', bas = ''){
        this.id = id;
        this.coup = coup;
        this.epaule = epaule;
        this.mache = mache;
        this.tourM = tourM;
        this.poitrine = poitrine;
        this.taille = taille;
        this.longueurB = longueurB;
        this.longueurGB = longueurGB;
        this.ceinture = ceinture;
        this.hanche = hanche;
        this.fesse = fesse;
        this.cuisse = cuisse;
        this.genou = genou;
        this.pantalonL = pantalonL;
        this.bas = bas;
    }
}