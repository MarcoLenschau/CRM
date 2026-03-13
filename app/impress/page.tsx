export default function ImpressPage() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border border-zinc-700 py-6 text-center">
        <h1 className="text-4xl font-bold text-blue-400">Impressum</h1>
        <p className="text-sm text-gray-400 mt-2">Legal Information</p>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Company Information</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="mt-4 bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
              <p><strong>Company Name:</strong> Lorem Ipsum GmbH</p>
              <p><strong>Address:</strong> Dolor Sit 123, 45678 Consectetur, Germany</p>
              <p><strong>Phone:</strong> +49 (0) 123 456789</p>
              <p><strong>Email:</strong> info@loremipsum.de</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Management Representatives</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <ul className="list-none mt-2 space-y-2">
              <li>• <strong>CEO:</strong> John Doe</li>
              <li>• <strong>CFO:</strong> Jane Smith</li>
              <li>• <strong>CTO:</strong> Alice Johnson</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Business Register</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <div className="mt-4 bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
              <p><strong>Register Court:</strong> Amtsgericht Consectetur</p>
              <p><strong>Register Number:</strong> HRB 123456</p>
              <p><strong>VAT ID:</strong> DE123456789</p>
              <p><strong>Tax Number:</strong> 12 345 678 901</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Responsibility for Contents</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
              ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Liability for Links</h2>
            <p>
              Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, 
              quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Copyright</h2>
            <p>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. Vel illum qui dolorem 
              eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium 
              voluptatum deleniti atque corrupti.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Dispute Resolution</h2>
            <p>
              Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt 
              mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Data Protection Officer</h2>
            <p>
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, 
              omnis voluptas assumenda est, omnis dolor repellendus.
            </p>
            <div className="mt-4 bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
              <p><strong>DPO:</strong> privacy@loremipsum.de</p>
              <p><strong>Contact:</strong> datenschutz@loremipsum.de</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Social Media</h2>
            <p>
              Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint 
              et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Disclaimer</h2>
            <p>
              Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor 
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-700 mb-8">
          <p className="text-xs text-gray-500">
            Last updated: March 13, 2026
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
