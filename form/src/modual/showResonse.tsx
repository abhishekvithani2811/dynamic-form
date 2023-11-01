import { useEffect, useState } from 'react';
import axios from 'axios';

function ShowResponse() {
    const [formComponents, setFormComponents] = useState<any[]>([]);
    const [FormQuestion, setFormQuestion] = useState<any[]>([]);


    useEffect(() => {
        axios.get('http://localhost:5000/Formresponse')
            .then(response => {
                // console.log(response.data)
                setFormComponents(response.data);
            })
            .catch(error => {
                console.error('Error fetching form data:', error);
            });
        // 
        axios.get('http://localhost:5000/formData', {
        })
            .then(response => {
                // console.log(response.data)
                setFormQuestion(response.data);
            })
            .catch(error => {
                console.error('Error fetching form data:', error);
            });
    }, []);




    return (
        <div className="flex items-center justify-center mt-10 " >
            <div className="bg-[#e4f1f8] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center  mb-6" style={{ color: "#1F6A8A" }}>
                    Dynamic Form
                </h1>
                {formComponents.map((item) => {
                    return (
                        <div key={item.id} >

                            {Object.keys(item).map((key) => (
                                <div key={key} className="mb-2 font-serif text-[#217290]">
                                   <h3 className="text-2xl text-[#476060]">  {key}</h3>
                                    {Array.isArray(item[key]) ? (
                                        <ul  className="list-disc pl-6 ">
                                            {item[key].map((value:any, idx:any) => (
                                                <li  key={idx}>{value.text}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="my-3 ">{item[key].text || item[key]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                })}

               
            </div>

        </div>
    );
}

export default ShowResponse;
