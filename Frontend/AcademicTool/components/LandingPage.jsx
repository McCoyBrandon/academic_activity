import React from 'react';
import { AssignmentTurnedIn, LibraryBooks, BarChart, Group } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate();

    const signup = () => {
        navigate("/signUp");
    }

    const login = () => {
        navigate("/loginScreen");
    }

    return (
        <div className="mx-auto p-8 bg-gradient-to-r ">
            <header className="flex justify-between items-center py-4 bg-white ">
                <h1 className="text-4xl font-bold text-blue-600">Academic Activity Tracker</h1>
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-5 hover:bg-blue-700" onClick={signup}>Sign Up</button>
                    <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700" onClick={login}>Sign In</button>
                </div>
            </header>

            <section className="text-center my-12">
                <h2 className="text-5xl font-bold mb-4 text-purple-600">Enhance Your Academic Journey</h2>
                <p className="text-lg mb-6 text-gray-700 max-w-2xl mx-auto">A comprehensive tool for students and researchers to track tasks, build portfolios, and reference past projects.</p>
            </section>

            <section id="features" className="my-12">
                <h3 className="text-4xl font-bold text-center mb-8 text-blue-600">Our Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<AssignmentTurnedIn className="text-red-500 text-5xl mb-4 animate-bounce" />}
                        title="Task Management"
                        description="Organize and track your academic tasks with an intuitive and easy-to-use interface."
                    />
                    <FeatureCard
                        icon={<LibraryBooks className="text-yellow-500 text-5xl mb-4 animate-spin" />}
                        title="Portfolio Creation"
                        description="Build a dynamic portfolio showcasing your academic projects, research, and achievements."
                    />

                    <FeatureCard
                        icon={<Group className="text-blue-500 text-5xl mb-4 animate-pulse" />}
                        title="Collaboration"
                        description="Collaborate seamlessly with peers and mentors, and share resources to enhance learning."
                    />
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <div className="flex flex-col items-center p-6 border rounded-lg bg-white">
            {icon}
            <h4 className="text-2xl font-semibold text-gray-800">{title}</h4>
            <p className="text-center text-gray-600">{description}</p>
        </div>
    </div>
);

export default LandingPage;
