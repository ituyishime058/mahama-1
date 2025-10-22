import React from 'react';
import KeyStats from './KeyStats';
import PhoneIcon from './icons/PhoneIcon';
import ClockIcon from './icons/ClockIcon';
import AmbulanceIcon from './icons/AmbulanceIcon';
import LocationPinIcon from './icons/LocationPinIcon';


const services = [
    { name: 'General Outpatient Clinic', description: 'For common illnesses and health consultations.' },
    { name: 'Maternal & Child Health', description: 'Prenatal, postnatal, and pediatric care.' },
    { name: 'Pharmacy', description: 'Dispensing essential medicines and prescriptions.' },
    { name: 'Vaccination Center', description: 'Routine immunizations for children and adults.' },
    { name: 'Mental Health Support', description: 'Counseling and psychosocial support services.' },
];

const HealthSectorPage: React.FC = () => {
  return (
    <div className="space-y-6">
        <p className="text-slate-600 dark:text-slate-400">
            Comprehensive healthcare services are available to all residents. Our facilities are staffed by trained medical professionals to address your health needs.
        </p>

        <KeyStats stats={[
            { label: 'Health Posts', value: '5' },
            { label: 'Medical Staff', value: '50+' },
            { label: 'Daily Consultations', value: '300+' },
            { label: 'Emergency Hotline', value: '112' },
        ]} />

        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <h3 className="font-bold text-lg mb-3">Core Services</h3>
            <ul className="space-y-3 list-disc list-inside">
                {services.map(service => (
                    <li key={service.name}>
                        <span className="font-semibold">{service.name}:</span> {service.description}
                    </li>
                ))}
            </ul>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2 mb-2"><ClockIcon className="w-5 h-5"/> Operating Hours</h4>
                <p>Main Clinic: 24/7 for emergencies</p>
                <p>Outpatient: 8:00 AM - 5:00 PM Daily</p>
            </div>
             <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2 mb-2"><AmbulanceIcon className="w-5 h-5"/> Emergency Services</h4>
                <p>For immediate medical assistance, please call <strong className="text-deep-red">112</strong>.</p>
            </div>
        </div>

        <div>
            <h3 className="font-bold text-lg mb-3">Locations</h3>
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <p className="flex items-center gap-2"><LocationPinIcon className="w-5 h-5"/> Main Hospital located at Zone B, near the central market.</p>
            </div>
        </div>
    </div>
  );
};
export default HealthSectorPage;