type ContentTestProps = {
    data: any;
    };
const  ContentTest = ({ data  }:ContentTestProps)=>{
    return (
        <div>
            <h1>data.name</h1>
        </div>
    )
}
// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://.../data`)
    const data = await res.json()
   
    // Pass data to the page via props
    return { props: { data } }
  }
export default ContentTest;