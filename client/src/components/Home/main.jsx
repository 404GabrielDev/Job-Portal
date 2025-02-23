import { useNavigate } from "react-router-dom";
import "./main.css";


const Home = () => {

  const navigate = useNavigate()

  const Card = ({
    image,
    title,
    description,
    information1,
    information2,
    information3,
    button,
  }) => {
    return (
      <div className="Card">
        <div>
          <img src={image} alt={title} className="card-image" />
        </div>
        <div className="container-titleCards">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <div>
          <p>✅ {information1}</p>
          <p>✅ {information2}</p>
          <p>✅ {information3}</p>
        </div>

        <button>{button}</button>
      </div>
    );
  };

  return (
    <>
      <div className="containerAll-Home">
        <section className="container-searchJobs">
          <div className="titleP1">
            <h1>Encontre Seu Emprego dos Sonhos, ou o Candidato Perfeito</h1>
            <p>
              Se Conecte com Milhares de Recrutadores e candidatos a Emprego em
              Nossa Plataforma
            </p>
          </div>

          <div className="inputSearchJobs">
            <button onClick={() => navigate('/searchjobs')}>Pesquisar Empregos</button>
          </div>
        </section>

        <section>
          <h1 id="title-mainCards">
            Por Que Escolher Esse <span>Site</span>
          </h1>

          <div className="container-cards">
            <Card
              image="/iconVaga.png"
              title="Diversas Oportunidades"
              description="Acesso a centenas de empregos e variedades na industria"
              information1="100,000+ Empregos Ativos"
              information2="50+ Categorias"
              information3="Opções Remotas e Presenciais!!!"
              button="Explorar Vagas"
            />

            <Card
              image="/iconCompany.png"
              title="Melhor Companhia"
              description="Conecte-se com empresas, desde Startups Inovadoras até empresas a nivel Mundial"
              information1="500+ Empregados Verificados"
              information2="Parcerias Exclusivas"
              information3="Processo de Inscrição direta!"
              button="Ver Companhias"
            />

            <Card
              image="/iconRec.png"
              title="Banco de Talentos"
              description="Empregadores têm acesso a uma variedade de candidatos qualificados."
              information1="1M+ Registered Job Seekers"
              information2="Advanced search filters"
              information3="AI-powered matching"
              button="Postar Um Trabalho"
            />
          </div>

          <div id="textBottom">
            <p>Confiado por 10,000+ empresas em todo o mundo</p>
          </div>
        </section>

        <section className="container-getStarted">
          <div>
            <h1>Preparado para Começar?</h1>
          </div>

          <div className="buttons-getStarted">
            <button onClick={() => navigate('/searchjobs')}>Procurar Vagas</button>
            <button onClick={() => navigate('/post')}>Postar Vagas</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
