import DescriptionIcon from '@mui/icons-material/Description';
import '../App.css'
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
function Header() {
    const particlesInit = async (main:any) => {
        // console.log(main);

        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
    };
    return (
        <div className=' '>
            <div className="header">
                <div className="particles-container">
                    <Particles
                        id="tsparticles"
                        init={particlesInit}

                        options={{

                            "particles": {
                                "number": {
                                    "value": 20,
                                    "density": {
                                        "enable": false,
                                        "value_area": 800
                                    }
                                },
                                "color": {
                                    "value": "#87CEEB"
                                },
                                "shape": {
                                    "type": "star",
                                    "options": {
                                    }
                                },
                                "opacity": {
                                    "value": 2,
                                    "random": false,
                                    "anim": {
                                        "enable": false,
                                        "speed": 1,
                                        "opacity_min": 0.1,
                                        "sync": false
                                    }
                                },
                                "size": {
                                    "value": 2,
                                    "random": false,
                                    "anim": {
                                        "enable": false,
                                        "speed": 40,
                                        "size_min": 0.1,
                                        "sync": false
                                    }
                                },
                                "rotate": {
                                    "value": 0,
                                    "random": true,
                                    "direction": "clockwise",
                                    "animation": {
                                        "enable": true,
                                        "speed": 10,
                                        "sync": false
                                    }
                                },
                                "line_linked": {
                                    "enable": true,
                                    "distance": 700,
                                    "color": "#87CEEB",
                                    "opacity": 0.1,
                                    "width": 2
                                },
                                "move": {
                                    "enable": true,
                                    "speed": 1,
                                    "direction": "none",
                                    "random": false,
                                    "straight": false,

                                }
                            },
                            "interactivity": {
                                "events": {
                                    "resize": true
                                },
                                "modes": {
                                    "bubble": {
                                        "distance": 400,
                                        "size": 1000,
                                        "duration": 2,
                                        "opacity": 8,
                                        "speed": 3
                                    },
                                    "repulse": {
                                        "distance": 200
                                    },
                                    "push": {
                                        "particles_nb": 4
                                    },
                                    "remove": {
                                        "particles_nb": 2
                                    }
                                }
                            },
                            "retina_detect": true,

                        }}
                    />
                </div>
                <div className=' bg-gradient-to-r from-sky-200 via-slate-50 to-sky-200 bg-slate-50 head'>
                    <div className='flex justify-between pt-3'>
                        <div className=' flex justify-start pl-4 '>
                            <div className=' file_icon'>
                                <DescriptionIcon />
                            </div>
                            <div className='ml-3 font-serif mt-3 text-xl '>
                                Untitled form
                            </div>
                            <div className='mt-3 mx-4 text-slate-500'>
                                <FolderOpenIcon />
                            </div>
                            <div className='mt-3 text-slate-500'>
                                <StarBorderIcon />
                            </div>
                            <div className='mt-4 ml-8  text-sm text-slate-500'>All change in drive</div>
                        </div>
                        <div className='flex justify-end mb-7 px-16'>
                            <div className='px-5 pt-2 text-slate-500'>
                                <ColorLensIcon />
                            </div>
                            <div className='px-3  pt-2 text-slate-500'>
                                <RemoveRedEyeIcon />
                            </div>
                            <div className='px-3  pt-2 text-slate-500'>
                                <ArrowBackIcon />
                            </div>
                            <div className='px-3 pr-4  pt-2 text-slate-500 '>
                                <ArrowForwardIcon />
                            </div>
                            <div className='Send'>
                                <button type='submit' className=" w-24 text-slate-50 font-bold py-2 px-4 rounded ">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center pb-1'>
                        <Link to='/' className='qrs font-serif text-xl hover:text-cyan-600 question  '>Question</Link>
                        <Link to='/view' className='qrs font-serif text-xl hover:text-cyan-600 mx-3  question '>Response</Link>
                        <Link to='/show_res' className='qrs font-serif text-xl hover:text-cyan-600 question '>Your_Answer</Link>
                        {/* <Link to='/setting' className='qrs font-serif text-xl hover:text-cyan-600    question '>Setting</Link> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header
