import '../Styles/AlgoDes.css'

interface AlgorithmDescriptionProps {
    name: string;
    description: string;
    pseudocode: string;
  }
  
  const AlgorithmDescription: React.FC<AlgorithmDescriptionProps> = ({ name, description, pseudocode }) => {
    return (
      <div className="algorithm-description">
        <h3>{name}</h3>
        <p>{description}</p>
        <pre>{pseudocode}</pre>
      </div>
    );
  };
  export default AlgorithmDescription;