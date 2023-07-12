import './home.css';
import carrImg from '../img/carruselTry.png';
import saw from '../img/chainsaw.png';
import pruner from '../img/pruners.png';
import trimmer from '../img/hedgetrimmer.png';

function Home() {
    return (
        <div className='homeDiv'>
            <div className="carrusel">
                <img src={carrImg} alt="carrusel trial" className="carrImg" />
                <h3 className='enunciadoCarrusel'>Espacio designado para el Carrusel</h3>
            </div>
            <div className="highlights">
                Estos son los productos destacados -- queremos productos detacados? los ponemos arriba en el carrusel?
                <hr />
                También podría ir aquí un paginado
                <hr />
                Esto está hardcodeado a la espera de la Api
            </div>
            <div className="cards">
                <div className="upperDiv">
                    <div className="name">
                        {/* La idea sería que hubieran links para acceder a cada Tool */}
                        <div className='nameTool'>Chainsaw</div>
                    </div>
                    <div className="imgCard">
                        <img src={saw} alt="This is a Tool" className="image" />
                        <div className="divCatDesc">
                            <div className="divCat"> <span className='block'>Category: </span> Garden </div>
                            <div className="divDesc"><span className='block'>Description:  </span> Lots of fun! </div>
                        </div>
                    </div>
                </div>

                <div className="upperDiv">
                    <div className="name">
                        {/* La idea sería que hubieran links para acceder a cada Tool */}
                        <div className='nameTool'>Pruner</div>
                    </div>
                    <div className="imgCard">
                        <img src={pruner} alt="This is a Tool" className="image" />
                        <div className="divCatDesc">
                            <div className="divCat"> <span className='block'>Category: </span> Garden </div>
                            <div className="divDesc"><span className='block'>Description:  </span> Versatile </div>
                        </div>
                    </div>
                </div>

                <div className="upperDiv">
                    <div className="name">
                        {/* La idea sería que hubieran links para acceder a cada Tool */}
                        <div className='nameTool'>Hedge trimmer</div>
                    </div>
                    <div className="imgCard">
                        <img src={trimmer} alt="This is a Tool" className="image" />
                        <div className="divCatDesc">
                            <div className="divCat"> <span className='block'>Category: </span> Garden </div>
                            <div className="divDesc"><span className='block'>Description:  </span> Useful </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;