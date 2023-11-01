import  { useEffect, useState } from 'react'
import axios from 'axios';

function FormBuilderComponent() {
  const [formComponents, setFormComponents] = useState<any[]>([]);

  interface FormComponent {
    question: string;
    inputType: string;
  }
  useEffect(() => {
    axios.get<FormComponent[]>('http://localhost:5000/formData')
      .then(response => {
        setFormComponents(response.data);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, []);
  return (
    <div>
      {/*  */}

    
      {/*  */}
      {formComponents.map((data) => {
        console.log(data)
        return (
          <>
            {data.map((data1: any) => {
              if (data1.type == "text") {
                return (
                  <>
                    <h1>{data1.question}{data1.type === 'text' && <input type="text" />}</h1>
                  </>
                )
              }
            })}
            {data.map((data1: any) => {
              if (data1.type == "checkbox") {
                return (
                  <>
                    <h1>{data1.question}</h1>
                    {
                      data1.options.map((data2: any) => {
                        return (
                          <>
                            <h1>{data2.text}{<input type="checkbox" />}</h1>
                          </>
                        )
                      })
                    }
                  </>
                )
              }

            })}
            {data.map((data1: any) => {
              if (data1.type == "radio") {
                return (
                  <>
                    <h1>{data1.question}</h1>
                    {
                      data1.options.map((data2: any) => {
                        return (
                          <>
                            <h1>{data2.text}{<input type="radio" />}</h1>
                          </>
                        )
                      })
                    }
                  </>
                )
              }

            })}
            {data.map((data1: any) => {
              if (data1.type == "textarea") {
                return (
                  <>
                    <h1>{data1.question}</h1>
                    {
                      data1.options.map((data2: any) => {
                        return (
                          <>
                            <h1>{data2.text}{<textarea rows={4} cols={50}></textarea>}</h1>
                          </>
                        )
                      })
                    }
                  </>
                )
              }

            })}
            
          </>
        )
      })}
    </div >
  )
}

export default FormBuilderComponent
